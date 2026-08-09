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
import { deriveMultiplier, samplesForSpellIds } from './deriveMultiplier.ts'
import { pctMaxHpAtKeyLevel } from './scaling.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')

/** Grimoire multiples within this much of a whole number are treated as exact. */
const CLEAN_MULTIPLE_TOLERANCE = 0.06

const pct = (value: number) => `${Math.round(value * 100)}%`
const short = (value: number) =>
  value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(2)}m`
    : value >= 1000
      ? `${Math.round(value / 1000)}k`
      : String(Math.round(value))

function varName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')
}

/**
 * Build the ability-file line.
 *
 * Damage is authored at full duration rather than the median observation: the app answers
 * "can I survive this", so the worst case is the useful number. The hand-tuned S1 files make
 * the same choice (arcaneBeam x6 where the median player ate one tick).
 */
function suggestedLine(candidate: AbilityCandidate, multiplier: number | null) {
  const fn = candidate.isBoss ? 'bossSpell' : 'trashSpell'
  const options: string[] = []

  if (candidate.tankOnly) options.push('tankOnly: true')
  if (candidate.maxTicks > 1) options.push('periodic: true')
  if (candidate.aoeFraction > 0.5) options.push('aoe: true')

  const hasCleanGrimoire =
    candidate.tickMultiplier !== null &&
    Math.abs(candidate.tickMultiplier - Math.round(candidate.tickMultiplier)) <
      CLEAN_MULTIPLE_TOLERANCE

  // Single hit that grimoire already has exactly right — no damage override needed.
  if (hasCleanGrimoire && Math.round(candidate.tickMultiplier!) === 1 && candidate.maxTicks === 1) {
    const suffix = options.length > 0 ? `, { ${options.join(', ')} }` : ''
    return `${varName(candidate.name)} = ${fn}(${candidate.primarySpellId}${suffix})`
  }

  const effect =
    candidate.grimoireEffectIndex && candidate.grimoireEffectIndex > 0
      ? `, { effectIndex: ${candidate.grimoireEffectIndex} }`
      : ''

  if (candidate.grimoireDamage) {
    options.unshift(`damage: spell.damage * ${candidate.maxTicks}`)
    return `${varName(candidate.name)} = ${fn}(${candidate.primarySpellId}, (spell) => ({ ${options.join(', ')} })${effect})`
  }

  // No grimoire effect at all — the only route is the season multiplier.
  const perTick = candidate.baseDamageP50 / Math.max(1, candidate.medianTicks)
  const coefficient = multiplier ? Math.round(perTick / multiplier) : null
  const damage = coefficient
    ? `scalingTickingDamage(${candidate.maxTicks}, ${coefficient})`
    : `${Math.round(perTick * candidate.maxTicks)}`

  options.unshift(`damage: ${damage}`)
  return `${varName(candidate.name)} = ${fn}(${candidate.primarySpellId}, () => ({ ${options.join(', ')} }))`
}

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
    lines.push(
      `grimoire        ${short(candidate.grimoireDamage)}  ->  ${candidate.tickMultiplier!.toFixed(2)}x` +
        `   (ticks ${candidate.medianTicks} median / ${candidate.maxTicks} max)`,
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
  if (candidate.possiblyIgnoresArmor) {
    lines.push(
      `CHECK           armor sensitivity only ${Math.round(candidate.armorSensitivity * 100)}pp` +
        ` (typical physical ~45pp) — verify ignoresArmor by hand`,
    )
  }
  lines.push(
    `evidence        ${candidate.instanceCount} instances over ${candidate.runsSeenIn} runs at +${candidate.keyLevels.join('/+')}`,
  )
  lines.push('```')
  lines.push('')
  lines.push('```ts')
  lines.push(`const ${suggestedLine(candidate, multiplier)}`)
  lines.push('```')
  lines.push('')

  return lines.join('\n')
}

function renderReport(dungeonKey: string, candidates: AbilityCandidate[]) {
  const multiplierFit = deriveMultiplier(
    samplesForSpellIds(candidates.flatMap((c) => c.spellIds)),
  )
  const multiplier = multiplierFit?.multiplier ?? null

  const lines: string[] = []
  lines.push(`# ${dungeonKey} — near-lethal ability candidates`)
  lines.push('')
  lines.push(
    `Damage is unmitigated and normalized to the +1 baseline; percentages are quoted at +${REFERENCE_KEY_LEVEL}.`,
  )
  if (multiplier) {
    lines.push(
      `Season multiplier derived from grimoire: \`${multiplier}\` (${multiplierFit!.accepted.length} effects, worst deviation ${multiplierFit!.worstDeviation.toFixed(2)}).`,
    )
  }
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
