/**
 * Derives the season's spell-power multiplier from grimoire data alone — no WCL calls.
 *
 * Every enemy spell's grimoire effect damage in a season is an integer multiple of one
 * constant (S1: 5084.50981336997). So the constant is an approximate GCD over those damages.
 * This replaces hand-deriving it, and it's what lets `scalingTickingDamage(ticks, coeff)`
 * be written for spells grimoire has no effect data for at all.
 *
 * Usage:
 *   npx tsx scripts/deriveMultiplier.ts                    # spell ids from scripts/output/*.json
 *   npx tsx scripts/deriveMultiplier.ts 1284958 1282051    # explicit spell ids
 *   npx tsx scripts/deriveMultiplier.ts --write            # also write <season>-mult.ts
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getGrimoireSpell } from 'grimoire-wow'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(__dirname, 'output')
const seasonDir = path.resolve(__dirname, '../src/backend/enemyAbilities/midnight_s2')
const seasonMultFile = path.join(seasonDir, 's2-mult.ts')

/**
 * Grimoire damages are `round(k * multiplier)`, so a genuine multiple sits within half a
 * damage point of `k * multiplier`. Anything further out is a different scaling class, not
 * rounding — S1's Erratic Zap misses by 40, and letting it in visibly drags the fit.
 * The slack over 0.5 absorbs the error still left in the multiplier mid-refinement.
 */
const MAX_ABSOLUTE_DEVIATION = 1
/** Looser relative bound used only to rank candidates before any refit has happened. */
const SEARCH_TOLERANCE = 1e-3
/** Largest tick/coefficient count we'll consider for the smallest observed damage. */
const MAX_DIVISOR = 200
/** Below this many accepted samples the fit isn't trustworthy. */
const MIN_SAMPLES = 4
/** Refit/re-accept passes. Converges in 2-3; the cap is just a guard. */
const REFINE_PASSES = 8

export interface Sample {
  spellId: number
  name: string
  damage: number
}

export interface FittedSample extends Sample {
  /** Which integer multiple of the multiplier this damage is. */
  k: number
  /** |damage - k * multiplier|, in damage points. */
  deviation: number
}

export interface MultiplierFit {
  multiplier: number
  accepted: FittedSample[]
  rejected: FittedSample[]
  worstDeviation: number
  medianDeviation: number
}

function fitSamples(samples: Sample[], multiplier: number): FittedSample[] {
  return samples.map((sample) => {
    const k = Math.max(1, Math.round(sample.damage / multiplier))
    return { ...sample, k, deviation: Math.abs(sample.damage - k * multiplier) }
  })
}

/** Least-squares multiplier holding each sample's integer k fixed. */
function refit(samples: FittedSample[]) {
  const numerator = samples.reduce((sum, { damage, k }) => sum + damage * k, 0)
  const denominator = samples.reduce((sum, { k }) => sum + k * k, 0)
  return numerator / denominator
}

function median(values: number[]) {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!
}

/**
 * Approximate GCD: the true multiplier divides the smallest sample exactly, so try
 * min/1, min/2, ... and keep whichever explains the most samples (largest multiplier wins
 * ties, since any multiplier's half also "fits" every sample).
 */
export function deriveMultiplier(samples: Sample[]): MultiplierFit | null {
  const usable = samples.filter((sample) => sample.damage > 0)
  if (usable.length < MIN_SAMPLES) return null

  const smallest = Math.min(...usable.map((sample) => sample.damage))

  let best: { multiplier: number; acceptedCount: number } | null = null
  for (let divisor = 1; divisor <= MAX_DIVISOR; ++divisor) {
    const candidate = smallest / divisor
    if (candidate < 1) break

    const acceptedCount = fitSamples(usable, candidate).filter(
      (sample) => sample.deviation / (sample.k * candidate) < SEARCH_TOLERANCE,
    ).length

    if (
      acceptedCount >= MIN_SAMPLES &&
      (!best ||
        acceptedCount > best.acceptedCount ||
        (acceptedCount === best.acceptedCount && candidate > best.multiplier))
    ) {
      best = { multiplier: candidate, acceptedCount }
    }
  }

  if (!best) return null

  // The approximate GCD only pins the multiplier to the precision of the single smallest
  // sample. Alternate refit / re-accept: each refit sharpens the multiplier, which in turn
  // sharpens who counts as a genuine multiple. Converges in 2-3 passes.
  let multiplier = best.multiplier
  let accepted = fitSamples(usable, multiplier)

  for (let pass = 0; pass < REFINE_PASSES; ++pass) {
    const kept = fitSamples(usable, multiplier).filter(
      (sample) => sample.deviation <= MAX_ABSOLUTE_DEVIATION,
    )
    if (kept.length < MIN_SAMPLES) break

    const next = refit(kept)
    accepted = kept
    if (next === multiplier) break
    multiplier = next
  }

  const finalPass = fitSamples(usable, multiplier)
  accepted = finalPass.filter((s) => s.deviation <= MAX_ABSOLUTE_DEVIATION)
  if (accepted.length < MIN_SAMPLES) return null

  return {
    multiplier,
    accepted,
    rejected: finalPass.filter((s) => s.deviation > MAX_ABSOLUTE_DEVIATION),
    worstDeviation: Math.max(...accepted.map((s) => s.deviation)),
    medianDeviation: median(accepted.map((s) => s.deviation)),
  }
}

export function samplesForSpellIds(spellIds: number[]): Sample[] {
  const samples: Sample[] = []

  for (const spellId of new Set(spellIds)) {
    let spell
    try {
      spell = getGrimoireSpell(spellId)
    } catch {
      continue
    }
    if (!spell?.effects) continue

    for (const effect of spell.effects) {
      if (effect.damage > 0) {
        samples.push({ spellId, name: spell.name, damage: effect.damage })
      }
    }
  }

  return samples
}

function spellIdsFromOutput(): number[] {
  if (!fs.existsSync(outputDir)) return []

  return fs
    .readdirSync(outputDir)
    .filter((file) => file.endsWith('_abilities.json'))
    .flatMap((file) => {
      const contents = JSON.parse(
        fs.readFileSync(path.join(outputDir, file), 'utf-8'),
      ) as Array<{ spellId: number }>
      return contents.map(({ spellId }) => spellId)
    })
}

function renderMultFile(fit: MultiplierFit) {
  return `// Generated by scripts/deriveMultiplier.ts — do not edit by hand.
// Derived from ${fit.accepted.length} grimoire spell effects (worst deviation ${fit.worstDeviation.toFixed(2)} damage).
const multiplier = ${fit.multiplier}

export const scalingTickingDamage = (ticks: number, baseDamage: number) =>
  multiplier * baseDamage * ticks

export const scaledDamage = (baseDamage: number) => multiplier * baseDamage
`
}

function main() {
  const args = process.argv.slice(2)
  const shouldWrite = args.includes('--write')
  const explicitIds = args.filter((arg) => /^\d+$/.test(arg)).map(Number)

  const spellIds = explicitIds.length > 0 ? explicitIds : spellIdsFromOutput()
  if (spellIds.length === 0) {
    console.error(
      'No spell ids. Run `yarn guess` first, or pass ids: npx tsx scripts/deriveMultiplier.ts 1284958 1282051',
    )
    process.exit(1)
  }

  const samples = samplesForSpellIds(spellIds)
  const fit = deriveMultiplier(samples)

  if (!fit) {
    console.error(
      `Could not derive a multiplier from ${samples.length} usable effect(s) across ${spellIds.length} spell(s).`,
    )
    process.exit(1)
  }

  console.log(`multiplier: ${fit.multiplier}`)
  console.log(
    `fit:        ${fit.accepted.length}/${samples.length} effects, worst deviation ${fit.worstDeviation.toFixed(2)}, median ${fit.medianDeviation.toFixed(2)} damage`,
  )

  console.log('\naccepted:')
  for (const sample of [...fit.accepted].sort((a, b) => a.k - b.k)) {
    console.log(
      `  ${String(sample.spellId).padEnd(9)} ${String(sample.damage).padStart(8)} = ${String(sample.k).padStart(3)}x   ${sample.name}`,
    )
  }

  if (fit.rejected.length > 0) {
    console.log('\nrejected (not a clean multiple — likely a different scaling class):')
    for (const sample of fit.rejected) {
      console.log(
        `  ${String(sample.spellId).padEnd(9)} ${String(sample.damage).padStart(8)} = ${(sample.damage / fit.multiplier).toFixed(4)}x  (off by ${sample.deviation.toFixed(0)})  ${sample.name}`,
      )
    }
  }

  if (shouldWrite) {
    fs.mkdirSync(seasonDir, { recursive: true })
    fs.writeFileSync(seasonMultFile, renderMultFile(fit))
    console.log(`\nWrote ${seasonMultFile}`)
  }
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  main()
}
