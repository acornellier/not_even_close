/**
 * Renders the human-review report from scripts/output/<key>_abilities.json.
 *
 * This is the primary artifact: a ranked list of abilities that one-shot or nearly one-shot a
 * player, with the evidence behind each call and a suggested ability-file line to paste.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { AbilityCandidate } from './guessAbilities.ts'
import { REFERENCE_KEY_LEVEL } from './guessAbilities.ts'
import { getDamageMultiplier } from 'grimoire-wow'
import { suggestedDeclaration } from './abilitySource.ts'
import { pctMaxHpAtKeyLevel } from './scaling.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')

/** Below this many observations, a tick-count disagreement isn't worth reporting. */
const MIN_INSTANCES_TO_TRUST_TICKS = 20

const pct = (value: number) => `${Math.round(value * 100)}%`
const short = (value: number) =>
  value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(2)}m`
    : value >= 1000
      ? `${Math.round(value / 1000)}k`
      : String(Math.round(value))

function renderCandidate(candidate: AbilityCandidate, multiplier: number | null) {
  const lines: string[] = []
  const tag = candidate.classification.toUpperCase()

  lines.push(
    `### ${candidate.name} (${candidate.primarySpellId}) — ${candidate.sourceNames.join(', ') || 'unknown'}  [${tag}]`,
  )
  lines.push('')
  lines.push('```')

  const oneShot = candidate.oneShotKeyLevel
  lines.push(
    `one-shots at    ${oneShot ? `+${oneShot}` : 'never (within +40)'}` +
      `        ${pct(candidate.pctMaxHpP95)} of max HP at +${REFERENCE_KEY_LEVEL}`,
  )
  lines.push(
    `%maxHP @+${REFERENCE_KEY_LEVEL}     p50 ${pct(candidate.pctMaxHpP50)} / p95 ${pct(candidate.pctMaxHpP95)} / max ${pct(candidate.pctMaxHpMax)}` +
      `   (vs ${short(candidate.medianTargetMaxHp)} hp)`,
  )
  lines.push(
    `base damage     p50 ${short(candidate.baseDamageP50)} / p95 ${short(candidate.baseDamageP95)} / max ${short(candidate.baseDamageMax)}   (normalized to +1)`,
  )

  if (candidate.grimoireDamage) {
    const dbcTicks = candidate.grimoirePeriodicTicks
    const ticksInfo = dbcTicks
      ? `${dbcTicks} DBC ticks${candidate.grimoireTickOnApply ? ' (ticks on apply)' : ''},` +
        ` observed ${candidate.medianTickEvents} median`
      : `ticks ${candidate.medianTicks} median / ${candidate.maxTicks} max`
    lines.push(
      `grimoire        ${short(candidate.grimoireDamage)}  ->  ${candidate.tickMultiplier!.toFixed(2)}x   (${ticksInfo})`,
    )
  } else {
    lines.push(
      `grimoire        no effect data   (ticks ${candidate.medianTicks} median / ${candidate.maxTicks} max)`,
    )
  }

  const dodged =
    candidate.dodgeFraction === null
      ? 'no cast events of its own'
      : `${candidate.castsFullyDodged}/${candidate.castCount} casts hit nobody (${pct(candidate.dodgeFraction)})`
  lines.push(
    `landing         ${candidate.playersHitPerCast.toFixed(1)} players/cast, ${dodged}`,
  )

  lines.push(
    `deaths          ${candidate.deathsCaused} killing blow(s), ${candidate.survivedCount} survived`,
  )

  if (candidate.defensivesOnSurvival.length > 0) {
    const top = candidate.defensivesOnSurvival
      .slice(0, 5)
      .map((d) => `${d.name} x${d.count}`)
      .join(', ')
    lines.push(`survived with   ${top}`)
  }

  const traits = [
    candidate.physical ? 'physical' : `magic (${candidate.schools.join('/')})`,
    candidate.tankOnly ? `tank-only (${pct(candidate.tankFraction)} tanks)` : null,
    candidate.aoeFraction > 0.5 ? `aoe (${pct(candidate.aoeFraction)})` : null,
  ].filter(Boolean)
  lines.push(`traits          ${traits.join(', ')}`)
  // Observing more ticks than the spell data allows means the DBC extraction is missing
  // something — most likely the tick-on-apply attribute.
  if (
    candidate.grimoirePeriodicTicks &&
    candidate.instanceCount >= MIN_INSTANCES_TO_TRUST_TICKS &&
    candidate.medianTickEvents > candidate.grimoirePeriodicTicks
  ) {
    lines.push(
      `CHECK           observed ${candidate.medianTickEvents} ticks but grimoire says ${candidate.grimoirePeriodicTicks}` +
        ` over ${candidate.instanceCount} instances — grimoire may be missing tickOnApply`,
    )
  }
  if (candidate.possiblyIgnoresArmor) {
    lines.push(
      `CHECK           armor sensitivity only ${Math.round(candidate.armorSensitivity * 100)}pp` +
        ` (typical physical ~45pp) — verify ignoresArmor by hand`,
    )
  }
  lines.push(
    `evidence        ${candidate.instanceCount} instances, ${candidate.runsSeenIn}/${candidate.runsAnalyzed} runs` +
      ` (${candidate.instancesPerRun.toFixed(2)} hits/run) at +${candidate.keyLevels.join('/+')}`,
  )
  lines.push('```')
  lines.push('')
  lines.push('```ts')
  lines.push(suggestedDeclaration(candidate, multiplier).code)
  lines.push('```')
  lines.push('')

  return lines.join('\n')
}

function renderReport(dungeonKey: string, candidates: AbilityCandidate[]) {
  const multiplier = getDamageMultiplier()

  const lines: string[] = []
  lines.push(`# ${dungeonKey} — near-lethal ability candidates`)
  lines.push('')
  lines.push(
    `Damage is unmitigated and normalized to the +1 baseline; percentages are quoted at +${REFERENCE_KEY_LEVEL}.`,
  )
  lines.push(`Season damage multiplier (grimoire-wow): \`${multiplier}\`.`)
  lines.push('')

  const lethal = candidates.filter((c) => c.classification === 'lethal')
  const avoidable = candidates.filter((c) => c.classification === 'avoidable')
  const chip = candidates.filter((c) => c.classification === 'chip')

  lines.push('## Summary')
  lines.push('')
  lines.push('| ability | one-shots at | %maxHP p95 | ticks | lands | deaths | class |')
  lines.push('| --- | --- | --- | --- | --- | --- | --- |')
  for (const candidate of candidates) {
    const lands =
      candidate.dodgeFraction === null
        ? '-'
        : `${pct(1 - candidate.dodgeFraction)} of casts`
    lines.push(
      `| ${candidate.name} | ${candidate.oneShotKeyLevel ? `+${candidate.oneShotKeyLevel}` : '-'} ` +
        `| ${pct(candidate.pctMaxHpP95)} | ${candidate.medianTicks}/${candidate.maxTicks} | ${lands} ` +
        `| ${candidate.deathsCaused} | ${candidate.classification} |`,
    )
  }
  lines.push('')

  const sections: Array<[string, AbilityCandidate[], string]> = [
    [
      'Lethal — plan a defensive',
      lethal,
      'Near or over 100% of max HP and lands reliably. This is the list worth authoring.',
    ],
    [
      'Avoidable — mostly dodged',
      avoidable,
      'Most casts land on nobody, so these are positioning checks rather than defensive checks.',
    ],
    ['Chip', chip, 'Never approaches lethal. Listed for completeness.'],
  ]

  for (const [title, group, blurb] of sections) {
    if (group.length === 0) continue
    lines.push(`## ${title}`)
    lines.push('')
    lines.push(`_${blurb}_`)
    lines.push('')
    for (const candidate of group) lines.push(renderCandidate(candidate, multiplier))
  }

  return lines.join('\n')
}

function main() {
  const requested = process.argv[2]
  const files = fs
    .readdirSync(outputDir)
    .filter((file) => file.endsWith('_abilities.json'))
    .filter((file) => !requested || file === `${requested}_abilities.json`)

  if (files.length === 0) {
    console.error(`No scraped data in ${outputDir}. Run \`yarn guess\` first.`)
    process.exit(1)
  }

  for (const file of files) {
    const dungeonKey = file.replace('_abilities.json', '')
    const candidates = JSON.parse(
      fs.readFileSync(path.join(outputDir, file), 'utf-8'),
    ) as AbilityCandidate[]

    const outPath = path.join(outputDir, `${dungeonKey}_report.md`)
    fs.writeFileSync(outPath, renderReport(dungeonKey, candidates))

    const lethal = candidates.filter((c) => c.classification === 'lethal').length
    console.log(`${dungeonKey}: ${lethal} lethal candidates -> ${outPath}`)
  }
}

main()
