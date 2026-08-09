/**
 * Scrapes Warcraft Logs to find enemy abilities that one-shot (or nearly one-shot) players.
 *
 * The unit of analysis is an *instance* — one application of a mechanic to one player, with all
 * of its ticks and split components summed — because that's what the sim models: a single hit
 * against full health. Damage is taken unmitigated and normalized back to the +1 baseline the
 * ability files are authored at, so it can be compared against player health at any key level.
 *
 * Output: scripts/output/<key>_abilities.json  (consumed by writeAbilities.ts / reportAbilities.ts)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getGrimoireSpell } from 'grimoire-wow'
import { allAbilities } from '../src/backend/ability.ts'
import { staminaToHp } from '../src/backend/stats.ts'
import { normalizeToBase, oneShotKeyLevel, pctMaxHpAtKeyLevel } from './scaling.ts'
import { getRateLimit, summarizeCacheUsage } from './wclClient.ts'
import type { Actor, DamageEvent, PlayerDetail } from './wclQueries.ts'
import {
  fetchDeaths,
  fetchEnemyCasts,
  fetchEnemyDamage,
  fetchFight,
  fetchMasterData,
  fetchPlayerDetails,
  fetchRankings,
  schoolsFromBitmask,
  unmitigatedDamage,
} from './wclQueries.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')

const dungeonEncounters: Record<string, number> = {
  magi: 62811,
  cavns: 62874,
  xenas: 62915,
  wind: 62805,
  aa: 162526,
  pit: 60658,
  seat: 411753,
  sky: 111209,
}

/** Reports sampled per dungeon, spread across keystone levels. */
const REPORTS_PER_DUNGEON = 16
/** Only logs at +10 and up, where both Fortified and Tyrannical are always active. */
const MIN_KEY_LEVEL = 10
/** Ticks of the same mechanic on the same player more than this far apart start a new instance. */
const INSTANCE_GAP_MS = 4000
/** How long after a cast its damage may land, for the "was it dodged" check. */
const CAST_LANDING_WINDOW_MS = 10_000
/** A death within this window of an instance is attributed to it. */
const DEATH_ATTRIBUTION_MS = 1000
/** Key level the report's headline percentages are quoted at. */
export const REFERENCE_KEY_LEVEL = 15
/** Ignore abilities seen in fewer runs than this — too little evidence. */
const MIN_RUNS_SEEN_IN = 2
/** Below this fraction of max HP at the reference key an ability is chip damage. */
const CHIP_PCT_MAX_HP = 0.4
/** Above this fraction of casts landing on nobody, it's a "don't stand in it" mechanic. */
const AVOIDABLE_DODGE_FRACTION = 0.5
/** At or above this fraction of unique targets being tanks, it's a tankbuster. */
const TANK_ONLY_MIN_FRACTION = 0.8
/**
 * Physical abilities whose tank-vs-dps mitigation gap is below this get flagged for a human
 * to check `ignoresArmor`.
 *
 * This is a REVIEW HINT, not a determination. WCL's `mitigated` lumps armor in with every
 * other damage reduction, so armor can't be isolated directly. Calibrated against the five
 * S1 abilities hand-tagged `ignoresArmor`, whose gaps were 2.9/10.8/11.5/19.2/20.4pp against
 * a typical ~45pp: this threshold catches all five, at the cost of roughly ten false
 * positives per dungeon. Good enough to shortlist, not good enough to emit.
 */
const ARMOR_SENSITIVITY_REVIEW_THRESHOLD = 0.21

/** Every defensive the sim models, so "survived with X" only names cooldowns it understands. */
const defensivesById = new Map<number, string>()
for (const ability of allAbilities) {
  if (ability.dr || ability.aoeDr || ability.absorb || ability.healthIncrease) {
    defensivesById.set(ability.spellId ?? ability.id, ability.name)
  }
}

interface Instance {
  name: string
  spellIds: number[]
  targetId: number
  isTank: boolean
  targetMaxHp: number
  startedAt: number
  /** Summed unmitigated damage across every tick and component. */
  damage: number
  ticks: number
  wasMitigated: boolean
  /** Summed mitigated / summed unmitigated across the instance's events. */
  mitigatedRatio: number
  mitigatedAmount: number
  isAoE: boolean
  buffIds: number[]
  keyLevel: number
  /** Damage normalized back to the +1 baseline. */
  baseDamage: number
  pctMaxHp: number
  killed: boolean
}

interface RunAbilityData {
  casts: number
  castsThatLanded: number
}

interface Run {
  code: string
  fightID: number
  keyLevel: number
  instances: Instance[]
  perAbility: Map<string, RunAbilityData>
  deathsByAbility: Map<number, number>
  sourceNames: Map<string, Set<string>>
  isBoss: Map<string, boolean>
  schools: Map<string, string[]>
}

export interface AbilityCandidate {
  name: string
  primarySpellId: number
  spellIds: number[]
  sourceNames: string[]
  isBoss: boolean
  physical: boolean
  schools: string[]

  runsSeenIn: number
  instanceCount: number

  baseDamageP50: number
  baseDamageP95: number
  baseDamageMax: number

  pctMaxHpP50: number
  pctMaxHpP95: number
  pctMaxHpMax: number
  oneShotKeyLevel: number | null

  medianTicks: number
  maxTicks: number
  tickFraction: number
  aoeFraction: number
  playersHitPerCast: number
  castCount: number
  castsFullyDodged: number
  /** null when the ability has no cast event of its own (damage-only spell id). */
  dodgeFraction: number | null

  tankFraction: number
  tankOnly: boolean
  /** Fraction of instances where any mitigation applied. */
  mitigatedFraction: number
  /** Median mitigated/unmitigated on tanks vs everyone else. */
  tankMitigation: number
  nonTankMitigation: number
  /** tankMitigation - nonTankMitigation. Typical physical abilities sit around 0.45. */
  armorSensitivity: number
  /** Review hint only — see ARMOR_SENSITIVITY_REVIEW_THRESHOLD. Never auto-emitted. */
  possiblyIgnoresArmor: boolean

  deathsCaused: number
  survivedCount: number
  defensivesOnSurvival: Array<{ spellId: number; name: string; count: number }>

  /** Median max HP of the players actually hit — the denominator behind the percentages. */
  medianTargetMaxHp: number

  grimoireDamage: number | null
  grimoireEffectIndex: number | null
  /** baseDamageP50 / grimoireDamage — the `spell.damage * N` a human would hand-write. */
  tickMultiplier: number | null

  classification: 'lethal' | 'avoidable' | 'chip'
  keyLevels: number[]
}

/**
 * Find the grimoire effect the observed damage is closest to a whole multiple of.
 *
 * A single-hit ability lands on multiplier ~1 (which validates the whole normalization
 * chain); a multi-tick one lands near the tick count, which is the `spell.damage * N` a
 * human would otherwise reverse-engineer by hand.
 */
function lookupGrimoire(spellIds: number[], observedBaseDamage: number) {
  let best: { damage: number; effectIndex: number; error: number; spellId: number } | null =
    null

  for (const spellId of spellIds) {
    let spell
    try {
      spell = getGrimoireSpell(spellId)
    } catch {
      continue
    }
    if (!spell?.effects) continue

    spell.effects.forEach((effect, effectIndex) => {
      if (!effect.damage || effect.damage <= 0) return
      const multiple = observedBaseDamage / effect.damage
      // Distance from the nearest whole number of ticks, relative to that tick count.
      const error = Math.abs(multiple - Math.round(multiple)) / Math.max(1, Math.round(multiple))
      if (!best || error < best.error) {
        best = { damage: effect.damage, effectIndex, error, spellId }
      }
    })
  }

  return best as { damage: number; effectIndex: number; error: number; spellId: number } | null
}

function percentile(values: number[], fraction: number) {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))
  return sorted[index]!
}

function median(values: number[]) {
  return percentile(values, 0.5)
}

function parseBuffs(buffs: string | undefined) {
  if (!buffs) return []
  return buffs
    .split('.')
    .filter(Boolean)
    .map(Number)
    .filter((id) => !Number.isNaN(id))
}

/** Spread the chosen reports across keystone levels rather than taking the top N parses. */
function selectRuns(
  rankings: Awaited<ReturnType<typeof fetchRankings>>,
  count: number,
): Array<{ code: string; fightID: number; keyLevel: number }> {
  const byCode = new Map<string, { code: string; fightID: number; keyLevel: number }>()
  for (const ranking of rankings) {
    if (!ranking.report?.code) continue
    if (ranking.bracketData < MIN_KEY_LEVEL) continue
    if (!byCode.has(ranking.report.code)) {
      byCode.set(ranking.report.code, {
        code: ranking.report.code,
        fightID: ranking.report.fightID,
        keyLevel: ranking.bracketData,
      })
    }
  }

  const byKeyLevel = new Map<number, typeof byCode extends Map<string, infer V> ? V[] : never>()
  for (const run of byCode.values()) {
    const bucket = byKeyLevel.get(run.keyLevel) ?? []
    bucket.push(run)
    byKeyLevel.set(run.keyLevel, bucket)
  }

  // Round-robin across key levels so a single popular bracket can't crowd out the rest.
  const buckets = [...byKeyLevel.entries()]
    .sort(([a], [b]) => b - a)
    .map(([, runs]) => runs)
  const selected: Array<{ code: string; fightID: number; keyLevel: number }> = []

  for (let depth = 0; selected.length < count; ++depth) {
    let addedAny = false
    for (const bucket of buckets) {
      const run = bucket[depth]
      if (!run) continue
      selected.push(run)
      addedAny = true
      if (selected.length >= count) break
    }
    if (!addedAny) break
  }

  return selected
}

async function collectRun(
  code: string,
  fightID: number,
): Promise<Run | null> {
  const fight = await fetchFight(code, fightID)
  if (!fight?.keystoneLevel || fight.keystoneLevel < MIN_KEY_LEVEL) return null

  const [master, playerDetails, damageEvents, castEvents, deathEvents] = await Promise.all([
    fetchMasterData(code),
    fetchPlayerDetails(code, fightID),
    fetchEnemyDamage(code, fightID, fight.startTime, fight.endTime),
    fetchEnemyCasts(code, fightID, fight.startTime, fight.endTime),
    fetchDeaths(code, fightID, fight.startTime, fight.endTime),
  ])

  const actorById = new Map<number, Actor>(master.actors.map((actor) => [actor.id, actor]))
  const abilityById = new Map(master.abilities.map((a) => [a.gameID, a]))

  const players = new Map<number, { name: string; isTank: boolean; maxHp: number }>()
  for (const [role, roleplayers] of Object.entries(playerDetails)) {
    for (const player of roleplayers as PlayerDetail[]) {
      const stamina = player.combatantInfo?.stats?.Stamina?.max ?? 0
      players.set(player.id, {
        name: player.name,
        isTank: role === 'tanks',
        maxHp: staminaToHp(stamina),
      })
    }
  }

  const nameFor = (abilityGameID: number) =>
    abilityById.get(abilityGameID)?.name ?? `Unknown ${abilityGameID}`

  const sourceNames = new Map<string, Set<string>>()
  const isBoss = new Map<string, boolean>()
  const schools = new Map<string, string[]>()

  // --- group damage events into instances, keyed by (ability name, target) ---------------
  // Keying on NAME rather than spell id is what merges split initial-hit + DoT components,
  // which the old duplicate-name filter used to throw away entirely.
  const buckets = new Map<string, DamageEvent[]>()
  for (const event of damageEvents) {
    if (event.abilityGameID === 1) continue // melee
    const target = players.get(event.targetID)
    if (!target || target.maxHp <= 0) continue

    const source = actorById.get(event.sourceID)
    if (!source || source.type !== 'NPC' || source.id === -1) continue

    const name = nameFor(event.abilityGameID)
    const key = `${name} ${event.targetID}`
    const bucket = buckets.get(key) ?? []
    bucket.push(event)
    buckets.set(key, bucket)

    const sources = sourceNames.get(name) ?? new Set<string>()
    sources.add(source.name)
    sourceNames.set(name, sources)
    isBoss.set(name, (isBoss.get(name) ?? false) || source.subType === 'Boss')

    const bitmask = Number(abilityById.get(event.abilityGameID)?.type ?? 0)
    if (bitmask > 0 && !schools.has(name)) schools.set(name, schoolsFromBitmask(bitmask))
  }

  const deathsByAbility = new Map<number, number>()
  for (const death of deathEvents) {
    if (!death.killingAbilityGameID) continue
    deathsByAbility.set(
      death.killingAbilityGameID,
      (deathsByAbility.get(death.killingAbilityGameID) ?? 0) + 1,
    )
  }

  const instances: Instance[] = []
  for (const [key, events] of buckets) {
    const [name, targetIdRaw] = key.split(' ')
    const targetId = Number(targetIdRaw)
    const target = players.get(targetId)!
    events.sort((a, b) => a.timestamp - b.timestamp)

    let current: Instance | null = null
    for (const event of events) {
      if (!current || event.timestamp - current.startedAt > INSTANCE_GAP_MS) {
        if (current) instances.push(current)
        current = {
          name: name!,
          spellIds: [],
          targetId,
          isTank: target.isTank,
          targetMaxHp: target.maxHp,
          startedAt: event.timestamp,
          damage: 0,
          ticks: 0,
          wasMitigated: false,
          mitigatedRatio: 0,
          mitigatedAmount: 0,
          isAoE: false,
          buffIds: parseBuffs(event.buffs),
          keyLevel: fight.keystoneLevel!,
          baseDamage: 0,
          pctMaxHp: 0,
          killed: false,
        }
      }

      current.damage += unmitigatedDamage(event)
      current.ticks += 1
      current.mitigatedAmount += event.mitigated ?? 0
      current.wasMitigated ||= (event.mitigated ?? 0) > 0
      current.isAoE ||= event.isAoE === true
      if (!current.spellIds.includes(event.abilityGameID)) {
        current.spellIds.push(event.abilityGameID)
      }
    }
    if (current) instances.push(current)
  }

  const boss = (name: string) => isBoss.get(name) ?? false
  for (const instance of instances) {
    const target = players.get(instance.targetId)!
    instance.baseDamage = normalizeToBase(
      instance.damage,
      instance.keyLevel,
      !boss(instance.name),
    )
    instance.pctMaxHp = instance.damage / target.maxHp
    instance.mitigatedRatio =
      instance.damage > 0 ? instance.mitigatedAmount / instance.damage : 0
    instance.killed = deathEvents.some(
      (death) =>
        death.targetID === instance.targetId &&
        death.killingAbilityGameID !== undefined &&
        instance.spellIds.includes(death.killingAbilityGameID) &&
        Math.abs(death.timestamp - instance.startedAt) <
          INSTANCE_GAP_MS + DEATH_ATTRIBUTION_MS,
    )
  }

  // --- cast bookkeeping: how often a cast produced no damage at all ----------------------
  const instancesByName = new Map<string, Instance[]>()
  for (const instance of instances) {
    const list = instancesByName.get(instance.name) ?? []
    list.push(instance)
    instancesByName.set(instance.name, list)
  }

  const castsByName = new Map<string, number[]>()
  for (const cast of castEvents) {
    const source = actorById.get(cast.sourceID)
    if (!source || source.type !== 'NPC' || source.id === -1) continue
    const name = nameFor(cast.abilityGameID)
    const list = castsByName.get(name) ?? []
    list.push(cast.timestamp)
    castsByName.set(name, list)
  }

  const perAbility = new Map<string, RunAbilityData>()
  for (const [name, castTimes] of castsByName) {
    const starts = (instancesByName.get(name) ?? []).map((i) => i.startedAt)
    const castsThatLanded = castTimes.filter((castTime) =>
      starts.some(
        (start) => start >= castTime - 500 && start <= castTime + CAST_LANDING_WINDOW_MS,
      ),
    ).length
    perAbility.set(name, { casts: castTimes.length, castsThatLanded })
  }

  return {
    code,
    fightID,
    keyLevel: fight.keystoneLevel,
    instances,
    perAbility,
    deathsByAbility,
    sourceNames,
    isBoss,
    schools,
  }
}

function aggregate(runs: Run[]): AbilityCandidate[] {
  const names = new Set(runs.flatMap((run) => run.instances.map((i) => i.name)))
  const candidates: AbilityCandidate[] = []

  for (const name of names) {
    const instances = runs.flatMap((run) => run.instances.filter((i) => i.name === name))
    if (instances.length === 0) continue

    const runsSeenIn = runs.filter((run) =>
      run.instances.some((i) => i.name === name),
    ).length
    if (runsSeenIn < MIN_RUNS_SEEN_IN) continue

    const isBoss = runs.some((run) => run.isBoss.get(name))
    const isTrash = !isBoss

    // Quote every percentage at one reference key so runs at different levels are comparable.
    const pctAtReference = instances.map((instance) =>
      pctMaxHpAtKeyLevel(
        instance.pctMaxHp,
        instance.keyLevel,
        REFERENCE_KEY_LEVEL,
        isTrash,
      ),
    )

    const spellIdCounts = new Map<number, number>()
    for (const instance of instances) {
      for (const spellId of instance.spellIds) {
        spellIdCounts.set(spellId, (spellIdCounts.get(spellId) ?? 0) + instance.damage)
      }
    }
    const spellIds = [...spellIdCounts.entries()]
      .sort(([, a], [, b]) => b - a)
      .map(([spellId]) => spellId)

    const castCount = runs.reduce(
      (sum, run) => sum + (run.perAbility.get(name)?.casts ?? 0),
      0,
    )
    const castsThatLanded = runs.reduce(
      (sum, run) => sum + (run.perAbility.get(name)?.castsThatLanded ?? 0),
      0,
    )

    const deathsCaused = runs.reduce(
      (sum, run) =>
        sum +
        spellIds.reduce((inner, spellId) => inner + (run.deathsByAbility.get(spellId) ?? 0), 0),
      0,
    )

    const schools = runs.reduce<string[]>(
      (found, run) => (found.length > 0 ? found : (run.schools.get(name) ?? [])),
      [],
    )
    const physical = schools[0] === 'physical'

    const mitigatedFraction =
      instances.filter((i) => i.wasMitigated).length / instances.length

    // Armor is the one mitigation source that differs hugely between a plate tank and a
    // cloth dps. If a physical ability is mitigated about equally on both, armor isn't part
    // of what's reducing it — that's the ignores-armor signature.
    const tankMitigation = median(
      instances.filter((i) => i.isTank).map((i) => i.mitigatedRatio),
    )
    const nonTankMitigation = median(
      instances.filter((i) => !i.isTank).map((i) => i.mitigatedRatio),
    )

    const uniqueTargets = new Set(instances.map((i) => i.targetId))
    const tankTargets = new Set(
      instances.filter((i) => i.isTank).map((i) => i.targetId),
    )
    const tankFraction = uniqueTargets.size > 0 ? tankTargets.size / uniqueTargets.size : 0

    // Defensives that were up on instances the player lived through.
    const defensiveCounts = new Map<number, number>()
    for (const instance of instances) {
      if (instance.killed) continue
      for (const buffId of instance.buffIds) {
        if (!defensivesById.has(buffId)) continue
        defensiveCounts.set(buffId, (defensiveCounts.get(buffId) ?? 0) + 1)
      }
    }

    const pctMaxHpP95 = percentile(pctAtReference, 0.95)
    const pctMaxHpMax = Math.max(...pctAtReference)
    const survivedCount = instances.filter((i) => !i.killed).length
    const baseDamageP50 = Math.round(median(instances.map((i) => i.baseDamage)))

    // Cross-reference grimoire: pick whichever effect the observed damage is closest to a
    // whole multiple of. That multiple is the `spell.damage * N` a human would hand-write.
    const grimoire = lookupGrimoire(spellIds, baseDamageP50)

    // An ability whose casts mostly land on nobody is a "don't stand in it" mechanic, not
    // something you plan a defensive for — even when a hit would kill you.
    const castsFullyDodged = castCount - castsThatLanded
    const dodgeFraction = castCount > 0 ? castsFullyDodged / castCount : null

    let classification: AbilityCandidate['classification']
    if (pctMaxHpP95 < CHIP_PCT_MAX_HP) {
      classification = 'chip'
    } else if (dodgeFraction !== null && dodgeFraction > AVOIDABLE_DODGE_FRACTION) {
      classification = 'avoidable'
    } else {
      classification = 'lethal'
    }

    candidates.push({
      name,
      primarySpellId: spellIds[0]!,
      spellIds,
      sourceNames: [
        ...new Set(runs.flatMap((run) => [...(run.sourceNames.get(name) ?? [])])),
      ],
      isBoss,
      physical,
      schools,

      runsSeenIn,
      instanceCount: instances.length,

      baseDamageP50,
      baseDamageP95: Math.round(percentile(instances.map((i) => i.baseDamage), 0.95)),
      baseDamageMax: Math.round(Math.max(...instances.map((i) => i.baseDamage))),

      pctMaxHpP50: median(pctAtReference),
      pctMaxHpP95,
      pctMaxHpMax,
      oneShotKeyLevel: oneShotKeyLevel(pctMaxHpP95, REFERENCE_KEY_LEVEL, isTrash),

      medianTicks: median(instances.map((i) => i.ticks)),
      maxTicks: Math.max(...instances.map((i) => i.ticks)),
      tickFraction:
        instances.filter((i) => i.ticks > 1).length / instances.length,
      aoeFraction: instances.filter((i) => i.isAoE).length / instances.length,
      playersHitPerCast: castCount > 0 ? instances.length / castCount : 0,
      castCount,
      castsFullyDodged,
      dodgeFraction,

      tankFraction,
      tankOnly: tankFraction >= TANK_ONLY_MIN_FRACTION,
      // Armor mitigates every physical hit, so a physical ability that essentially never
      // gets mitigated is bypassing armor. Compared as a fraction rather than "never": with
      // hundreds of instances, one stray mitigated event shouldn't veto the call.
      mitigatedFraction,
      tankMitigation,
      nonTankMitigation,
      armorSensitivity: tankMitigation - nonTankMitigation,
      possiblyIgnoresArmor:
        physical &&
        instances.some((i) => i.isTank) &&
        tankMitigation - nonTankMitigation < ARMOR_SENSITIVITY_REVIEW_THRESHOLD,

      deathsCaused,
      survivedCount,
      defensivesOnSurvival: [...defensiveCounts.entries()]
        .sort(([, a], [, b]) => b - a)
        .map(([spellId, count]) => ({
          spellId,
          name: defensivesById.get(spellId)!,
          count,
        })),

      medianTargetMaxHp: Math.round(median(instances.map((i) => i.targetMaxHp))),

      grimoireDamage: grimoire?.damage ?? null,
      grimoireEffectIndex: grimoire?.effectIndex ?? null,
      tickMultiplier: grimoire ? baseDamageP50 / grimoire.damage : null,

      classification,
      keyLevels: [...new Set(instances.map((i) => i.keyLevel))].sort((a, b) => a - b),
    })
  }

  return candidates.sort((a, b) => b.pctMaxHpP95 - a.pctMaxHpP95)
}

async function main() {
  const requestedKey = process.argv[2]
  const keys = requestedKey ? [requestedKey] : Object.keys(dungeonEncounters)

  if (requestedKey && !dungeonEncounters[requestedKey]) {
    console.error(`Unknown dungeon key: ${requestedKey}`)
    console.error(`Available: ${Object.keys(dungeonEncounters).join(', ')}`)
    process.exit(1)
  }

  try {
    const limit = await getRateLimit()
    console.log(
      `WCL points: ${Math.round(limit.pointsSpentThisHour)}/${limit.limitPerHour} used this hour, resets in ${Math.round(limit.pointsResetIn / 60)}m\n`,
    )
  } catch {
    // Non-fatal — the budget check is a convenience.
  }

  fs.mkdirSync(outputDir, { recursive: true })

  for (const key of keys) {
    const encounterId = dungeonEncounters[key]!
    console.log(`=== ${key} (encounter ${encounterId}) ===`)

    const rankings = await fetchRankings(encounterId)
    const selected = selectRuns(rankings, REPORTS_PER_DUNGEON)
    if (selected.length === 0) {
      console.log(`  no rankings at +${MIN_KEY_LEVEL} or above, skipping\n`)
      continue
    }

    const levels = selected.map((run) => run.keyLevel)
    console.log(
      `  ${selected.length} runs, +${Math.min(...levels)} to +${Math.max(...levels)}`,
    )

    const runs: Run[] = []
    const failures: string[] = []
    for (const { code, fightID } of selected) {
      try {
        const run = await collectRun(code, fightID)
        if (run) runs.push(run)
      } catch (err) {
        failures.push(`${code}#${fightID}: ${(err as Error).message}`)
      }
    }

    if (failures.length > 0) {
      console.log(`  ${failures.length} run(s) failed:`)
      for (const failure of failures) console.log(`    ${failure}`)
    }

    if (runs.length === 0) {
      console.log(`  no usable runs, skipping\n`)
      continue
    }

    const candidates = aggregate(runs)
    const outPath = path.join(outputDir, `${key}_abilities.json`)
    fs.writeFileSync(outPath, JSON.stringify(candidates, null, 2))

    const counts = { lethal: 0, avoidable: 0, chip: 0 }
    for (const candidate of candidates) counts[candidate.classification]++
    console.log(
      `  ${runs.length} runs analyzed, ${candidates.length} abilities: ${counts.lethal} lethal, ${counts.avoidable} avoidable, ${counts.chip} chip`,
    )
    console.log(`  -> ${outPath}`)
    console.log(`  ${summarizeCacheUsage()}\n`)
  }
}

// Guarded so reportAbilities.ts can import the shared types/constants without running a scrape.
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
