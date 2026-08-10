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
  bossActorIds,
  fetchDeaths,
  fetchEnemyCasts,
  fetchEnemyDamage,
  fetchFight,
  fetchMasterData,
  fetchPlayerDetails,
  fetchRankings,
  isMiss,
  schoolsFromBitmask,
  unmitigatedDamage,
} from './wclQueries.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')

const dungeonEncounters: Record<string, number> = {
  murd: 62813, // live: 12813
  nalo: 62825, // live: 12825
  vale: 62859, // live: 12859
  void: 62923, // live: 12923
  fang: 62993, // live: 12993
  rlp: 162521, // live: 112521
  tos: 111877, // live: 61877
  kr: 111762, // live: 61762
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
/**
 * An ability that can't reach 100% of a player's health by this key level isn't a one-shot
 * problem — it's damage the healer covers.
 *
 * Expressed as a key level rather than a % of max HP because that's the question being asked.
 * (For reference, +21 lands at ~59% of max HP at the +15 the report quotes.) Logs currently
 * top out around +21, so anything needing +22 or beyond is extrapolation either way.
 */
const MAX_ONE_SHOT_KEY_LEVEL = 21
/** Above this fraction of casts landing on nobody, it's a "don't stand in it" mechanic. */
const AVOIDABLE_DODGE_FRACTION = 0.5
/**
 * Above this fraction of *exposed players* dodging it, likewise.
 *
 * Counting only casts that hit nobody badly under-reports avoidance: a 5-player AoE where one
 * person eats it every time reads as "always lands", when four out of five dodged it. Measuring
 * per exposed player instead catches those.
 */
const AVOIDABLE_AVOIDED_FRACTION = 0.6
/** Mythic+ is always a 5-player group. */
const GROUP_SIZE = 5
/**
 * When an ability has no cast events of its own, neither avoidance metric can be computed, so
 * exposure rate is the only signal left. Fewer than this many players hit per run — and never
 * having killed anyone — means it's being avoided, not that it's unavoidable.
 */
const LOW_EXPOSURE_PER_RUN = 1
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
  lastEventAt: number
  /** Summed unmitigated damage across every tick and component. */
  damage: number
  ticks: number
  /** Events carrying WCL's tick flag — genuine periodic damage. */
  tickEvents: number
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
  startTime: number
  endTime: number
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

  /** How far into a run this is first met, 0-1. Drives the order abilities are listed in. */
  firstSeenFraction: number
  runsSeenIn: number
  runsAnalyzed: number
  instanceCount: number
  /** Player-instances per analyzed run. An unavoidable group-wide hit runs well above 1. */
  instancesPerRun: number

  baseDamageP50: number
  baseDamageP95: number
  baseDamageMax: number

  pctMaxHpP50: number
  pctMaxHpP95: number
  pctMaxHpMax: number
  oneShotKeyLevel: number | null

  medianTicks: number
  /** Median count of genuine periodic ticks, excluding any initial direct hit. */
  medianTickEvents: number
  /** Robust stand-in for "full duration" — max is too easily skewed by one merged outlier. */
  p95Ticks: number
  maxTicks: number
  /** Fraction of instances containing at least one genuine periodic tick. */
  tickFraction: number
  aoeFraction: number
  playersHitPerCast: number
  castCount: number
  castsFullyDodged: number
  /** null when the ability has no cast event of its own (damage-only spell id). */
  dodgeFraction: number | null
  /** Share of exposed players who weren't hit. null when there are no cast events. */
  avoidedFraction: number | null

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
  /** Exact DBC tick count, when grimoire has periodic data for this spell. */
  grimoireTicks: number | null
  /** Full DBC duration in ms — how long "full duration" damage would take to land. */
  grimoireDuration: number | null
  grimoireDirectDamage: number | null
  grimoirePeriodicDamage: number | null
  grimoirePeriodicTicks: number | null
  /** First tick lands with the hit — already folded into grimoirePeriodicTicks. */
  grimoireTickOnApply: boolean
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
interface GrimoireMatch {
  /** Damage of the effect the observation matched. */
  damage: number
  effectIndex: number
  error: number
  spellId: number
  /** Exact DBC tick count when that effect is a periodic aura. */
  ticks: number | null
  /** Full DBC duration of the spell in ms. */
  duration: number | null
  /** The spell's direct-damage effect, when it also has one. */
  directDamage: number | null
  /** Per-tick damage and count of the spell's periodic effect, when it has one. */
  periodicDamage: number | null
  periodicTicks: number | null
  /** The DoT lands its first tick on application, so `ticks` already counts that one. */
  periodicTickOnApply: boolean
}

function lookupGrimoire(
  spellIds: number[],
  observedBaseDamage: number,
): GrimoireMatch | null {
  let best: GrimoireMatch | null = null

  for (const spellId of spellIds) {
    let spell
    try {
      spell = getGrimoireSpell(spellId)
    } catch {
      continue
    }
    if (!spell?.effects) continue

    const direct = spell.effects.find((effect) => !effect.periodic && effect.damage > 0)
    const periodic = spell.effects.find((effect) => effect.periodic && effect.damage > 0)

    for (const effect of spell.effects) {
      if (!effect.damage || effect.damage <= 0) continue
      // A periodic effect's damage is per tick, so compare the observation against the whole
      // DoT; otherwise a 12-tick bleed looks like a 12x multiple of a single tick.
      const total = effect.periodic ? effect.damage * (effect.ticks ?? 1) : effect.damage
      const multiple = observedBaseDamage / total
      // Distance from the nearest whole number, relative to it.
      const error =
        Math.abs(multiple - Math.round(multiple)) / Math.max(1, Math.round(multiple))

      if (!best || error < best.error) {
        best = {
          damage: effect.damage,
          effectIndex: effect.index,
          error,
          spellId,
          ticks: effect.periodic ? (effect.ticks ?? null) : null,
          duration: spell.duration ?? null,
          directDamage: direct?.damage ?? null,
          periodicDamage: periodic?.damage ?? null,
          periodicTicks: periodic?.ticks ?? null,
          periodicTickOnApply: periodic?.tickOnApply === true,
        }
      }
    }
  }

  return best
}

const AUTO_ATTACK_NAMES = new Set(['Melee'])

/**
 * Auto-attacks, which the app deliberately doesn't model.
 *
 * WCL reports melee under ability id 1, under negative pseudo-ids (-2, -8 seen in S2), and
 * under several ordinary-looking spell ids that differ per dungeon, so the name is the only
 * reliable discriminator. Negative ids are WCL internals and never a real spell.
 */
function isAutoAttack(abilityGameID: number, name: string) {
  return abilityGameID <= 1 || AUTO_ATTACK_NAMES.has(name)
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

  // A run without actor/ability names can't be attributed to anything. Skip it rather than
  // silently contributing "Unknown 12345" rows to the aggregate.
  if (master.actors.length === 0 || master.abilities.length === 0) return null

  const actorById = new Map<number, Actor>(master.actors.map((actor) => [actor.id, actor]))
  const bossIds = bossActorIds(fight, master.actors)
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
    const name = nameFor(event.abilityGameID)
    if (isAutoAttack(event.abilityGameID, name)) continue
    // Dodges, parries, immunes and evades still arrive as damage events carrying no damage.
    if (isMiss(event.hitType)) continue

    const target = players.get(event.targetID)
    if (!target || target.maxHp <= 0) continue

    const source = actorById.get(event.sourceID)
    if (!source || source.type !== 'NPC' || source.id === -1) continue

    const key = `${name} ${event.targetID}`
    const bucket = buckets.get(key) ?? []
    bucket.push(event)
    buckets.set(key, bucket)

    const sources = sourceNames.get(name) ?? new Set<string>()
    sources.add(source.name)
    sourceNames.set(name, sources)
    isBoss.set(name, (isBoss.get(name) ?? false) || bossIds.has(source.id))

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
      // A direct hit always begins a new application; only genuine DoT ticks fold into the
      // one before them. Without this, two separate shots at the same player inside the gap
      // window merge into a fake 2-tick "instance".
      // Gap is measured from the previous event, not the instance start — measuring from the
      // start silently truncated every DoT longer than the window (a 1s-period DoT could never
      // record more than 5 ticks).
      if (
        !current ||
        !event.tick ||
        event.timestamp - current.lastEventAt > INSTANCE_GAP_MS
      ) {
        if (current) instances.push(current)
        current = {
          name: name!,
          spellIds: [],
          targetId,
          isTank: target.isTank,
          targetMaxHp: target.maxHp,
          startedAt: event.timestamp,
          lastEventAt: event.timestamp,
          damage: 0,
          ticks: 0,
          tickEvents: 0,
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

      current.lastEventAt = event.timestamp
      current.damage += unmitigatedDamage(event)
      current.ticks += 1
      if (event.tick) current.tickEvents += 1
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

  // --- cast bookkeeping ------------------------------------------------------------------
  // Keyed by ability NAME, not spell id: a cast event usually carries a different spell id
  // than the damage it produces, so keying by id loses the association for most abilities.
  // The ambiguity that introduces (two spells sharing a name) is resolved in aggregate().
  const instancesByName = new Map<string, Instance[]>()
  for (const instance of instances) {
    const list = instancesByName.get(instance.name) ?? []
    list.push(instance)
    instancesByName.set(instance.name, list)
  }

  const castsByName = new Map<string, number[]>()
  for (const cast of castEvents) {
    // The Casts stream carries a `begincast` alongside the `cast` for anything with a cast
    // time. Counting both double-counts those abilities and halves their hits-per-cast.
    if (cast.type !== 'cast') continue

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
    startTime: fight.startTime,
    endTime: fight.endTime,
    instances,
    perAbility,
    deathsByAbility,
    sourceNames,
    isBoss,
    schools,
  }
}

/**
 * Group spell ids that belong to the same mechanic.
 *
 * Instances are keyed by ability name so an initial hit and its DoT — which are separate spell
 * ids — merge into one application. But distinct spells sometimes share a name, and fusing
 * those conflates two different damage profiles. Ids are therefore only grouped when they
 * actually co-occur inside an instance; ids that merely share a name stay separate.
 */
function groupSpellIds(instances: Instance[]) {
  const parent = new Map<number, number>()
  const find = (id: number): number => {
    const seen = parent.get(id)
    if (seen === undefined || seen === id) {
      parent.set(id, id)
      return id
    }
    const root = find(seen)
    parent.set(id, root)
    return root
  }
  const union = (a: number, b: number) => {
    const rootA = find(a)
    const rootB = find(b)
    if (rootA !== rootB) parent.set(rootB, rootA)
  }

  for (const instance of instances) {
    const [first, ...rest] = instance.spellIds
    if (first === undefined) continue
    find(first)
    for (const spellId of rest) union(first, spellId)
  }

  return find
}

function aggregate(runs: Run[]): AbilityCandidate[] {
  const runsAnalyzed = runs.length
  const allInstances = runs.flatMap((run) => run.instances)
  const find = groupSpellIds(allInstances)

  const groupKey = (instance: Instance) =>
    instance.spellIds[0] === undefined ? -1 : find(instance.spellIds[0])
  const groups = new Set(allInstances.map(groupKey))
  const candidates: AbilityCandidate[] = []

  // Casts are recorded per name. When a name covers more than one mechanic, there's no honest
  // way to split them, so those groups get no cast data and fall back to exposure rate.
  const groupsPerName = new Map<string, Set<number>>()
  for (const instance of allInstances) {
    const seen = groupsPerName.get(instance.name) ?? new Set<number>()
    seen.add(groupKey(instance))
    groupsPerName.set(instance.name, seen)
  }

  for (const group of groups) {
    const instances = allInstances.filter((i) => groupKey(i) === group)
    if (instances.length === 0) continue

    const name = instances[0]!.name
    const runsSeenIn = runs.filter((run) =>
      run.instances.some((i) => groupKey(i) === group),
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

    const nameIsUnambiguous = (groupsPerName.get(name)?.size ?? 1) === 1
    const castCount = nameIsUnambiguous
      ? runs.reduce((sum, run) => sum + (run.perAbility.get(name)?.casts ?? 0), 0)
      : 0
    const castsThatLanded = nameIsUnambiguous
      ? runs.reduce((sum, run) => sum + (run.perAbility.get(name)?.castsThatLanded ?? 0), 0)
      : 0

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
    const aoeFraction = instances.filter((i) => i.isAoE).length / instances.length
    const playersHitPerCast = castCount > 0 ? instances.length / castCount : 0

    // An AoE is "aimed at" the whole group; anything else at a single player. Comparing hits
    // per cast against that tells you what share of the people who could have been hit weren't.
    const expectedTargetsPerCast = aoeFraction > 0.5 ? GROUP_SIZE : 1
    const avoidedFraction =
      castCount > 0
        ? Math.min(1, Math.max(0, 1 - playersHitPerCast / expectedTargetsPerCast))
        : null

    const instancesPerRun = instances.length / runsAnalyzed

    // Where in the dungeon you first meet this, as a fraction of the run. Taken per run and
    // then medianed, so a single unusual route or a wildly different run length can't skew it.
    const firstSeenPerRun = runs
      .map((run) => {
        const first = run.instances
          .filter((i) => groupKey(i) === group)
          .reduce((min, i) => Math.min(min, i.startedAt), Infinity)
        if (first === Infinity) return null
        const duration = run.endTime - run.startTime
        return duration > 0 ? (first - run.startTime) / duration : 0
      })
      .filter((value): value is number => value !== null)
    const firstSeenFraction = median(firstSeenPerRun)

    let classification: AbilityCandidate['classification']
    const oneShotAt = oneShotKeyLevel(pctMaxHpP95, REFERENCE_KEY_LEVEL, isTrash)
    if (oneShotAt === null || oneShotAt > MAX_ONE_SHOT_KEY_LEVEL) {
      classification = 'chip'
    } else if (
      (dodgeFraction !== null && dodgeFraction > AVOIDABLE_DODGE_FRACTION) ||
      (avoidedFraction !== null && avoidedFraction > AVOIDABLE_AVOIDED_FRACTION)
    ) {
      classification = 'avoidable'
    } else if (
      // No cast events, so avoidance is unmeasurable. Falling through to `lethal` treated
      // "we couldn't tell" as "unavoidable". Rate stands in instead — but a mechanic that has
      // actually killed someone stays lethal however rarely it lands, since that's precisely
      // the rare-but-deadly case worth planning a defensive for.
      castCount === 0 &&
      instancesPerRun < LOW_EXPOSURE_PER_RUN &&
      deathsCaused === 0
    ) {
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

      firstSeenFraction,
      runsSeenIn,
      runsAnalyzed,
      instanceCount: instances.length,
      instancesPerRun,

      baseDamageP50,
      baseDamageP95: Math.round(percentile(instances.map((i) => i.baseDamage), 0.95)),
      baseDamageMax: Math.round(Math.max(...instances.map((i) => i.baseDamage))),

      pctMaxHpP50: median(pctAtReference),
      pctMaxHpP95,
      pctMaxHpMax,
      oneShotKeyLevel: oneShotKeyLevel(pctMaxHpP95, REFERENCE_KEY_LEVEL, isTrash),

      medianTicks: median(instances.map((i) => i.ticks)),
      medianTickEvents: median(instances.map((i) => i.tickEvents)),
      p95Ticks: Math.round(percentile(instances.map((i) => i.ticks), 0.95)),
      maxTicks: Math.max(...instances.map((i) => i.ticks)),
      tickFraction:
        instances.filter((i) => i.tickEvents > 0).length / instances.length,
      aoeFraction,
      playersHitPerCast,
      castCount,
      castsFullyDodged,
      dodgeFraction,
      avoidedFraction,

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
      grimoireTicks: grimoire?.ticks ?? null,
      grimoireDuration: grimoire?.duration ?? null,
      grimoireDirectDamage: grimoire?.directDamage ?? null,
      grimoirePeriodicDamage: grimoire?.periodicDamage ?? null,
      grimoirePeriodicTicks: grimoire?.periodicTicks ?? null,
      grimoireTickOnApply: grimoire?.periodicTickOnApply ?? false,
      tickMultiplier: grimoire ? baseDamageP50 / grimoire.damage : null,

      classification,
      keyLevels: [...new Set(instances.map((i) => i.keyLevel))].sort((a, b) => a - b),
    })
  }

  // Route order: the order you actually meet these running the dungeon, which is how the
  // ability list is read in the app.
  return candidates.sort((a, b) => a.firstSeenFraction - b.firstSeenFraction)
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
