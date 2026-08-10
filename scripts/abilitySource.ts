/**
 * Turns a scraped candidate into the ability-file source line.
 * Shared by reportAbilities.ts (shows it) and writeAbilities.ts (writes it).
 */
import type { AbilityCandidate } from './guessAbilities.ts'

/** Grimoire multiples within this much of a whole number are treated as exact. */
const CLEAN_MULTIPLE_TOLERANCE = 0.06
/** Beyond this, a DoT is sustained damage rather than a burst to survive. */
const LONG_DOT_MS = 6000
/** Only note the full-duration assumption when players observably fall short of it. */
const FULL_DURATION_FRACTION = 0.7

export function varName(name: string) {
  const camel = name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')

  // Identifiers can't start with a digit.
  return /^[0-9]/.test(camel) ? `spell${camel}` : camel
}

export interface Declaration {
  varName: string
  /** The full `const x = bossSpell(...)` line. */
  code: string
  /** True when the line calls scalingTickingDamage and needs the season-multiplier import. */
  needsScalingHelper: boolean
}

/**
 * Damage is authored at full duration: the app answers "can I survive this", so the worst case
 * is the useful number.
 *
 * Tick counts come from grimoire's DBC data when available — exact, and a property of the spell.
 * The observed p95 is only a fallback for spells grimoire has no periodic data for, and it
 * measures how long players stood in something rather than how long it lasts.
 */
export function suggestedDeclaration(
  candidate: AbilityCandidate,
  multiplier: number | null,
): Declaration {
  const name = varName(candidate.name)
  const fn = candidate.isBoss ? 'bossSpell' : 'trashSpell'
  const options: string[] = []

  const grimoireTicks = candidate.grimoirePeriodicTicks
  const ticks = grimoireTicks ?? candidate.p95Ticks

  // The sim models one instantaneous hit, so a long DoT's full-duration total is damage spread
  // over many seconds of healing rather than something to survive at once. Authored at full
  // duration anyway (as the hand-tuned S1 files do), but say so — the S1 convention was a note.
  if (
    candidate.grimoireDuration &&
    candidate.grimoireDuration > LONG_DOT_MS &&
    grimoireTicks &&
    grimoireTicks > 1 &&
    candidate.medianTickEvents < grimoireTicks * FULL_DURATION_FRACTION
  ) {
    options.push(
      `notes: 'Assumes full duration (${Math.round(candidate.grimoireDuration / 1000)}s); players typically took ${candidate.medianTickEvents} of ${grimoireTicks} ticks.'`,
    )
  }

  if (candidate.tankOnly) options.push('tankOnly: true')
  if (ticks > 1) options.push('periodic: true')
  if (candidate.aoeFraction > 0.5) options.push('aoe: true')

  const coefficient = (perTick: number) =>
    multiplier ? Math.round(perTick / multiplier) : null

  // Direct hit plus a DoT. Both halves come off the resolved spell — grimoire already knows
  // the tick count and per-tick damage, so hardcoding them here would only restate its data
  // and silently go stale the next time the spell is tuned.
  if (
    candidate.grimoireDirectDamage &&
    candidate.grimoirePeriodicDamage &&
    grimoireTicks
  ) {
    options.unshift('damage: spell.damage + spell.periodicDamage')
    return {
      varName: name,
      code: `const ${name} = ${fn}(${candidate.primarySpellId}, (spell) => ({ ${options.join(', ')} }))`,
      needsScalingHelper: false,
    }
  }

  // Pure DoT: the resolved damage is one tick, and periodicDamage is the full duration.
  if (grimoireTicks && grimoireTicks > 1 && !candidate.grimoireDirectDamage) {
    options.unshift('damage: spell.periodicDamage')
    return {
      varName: name,
      code: `const ${name} = ${fn}(${candidate.primarySpellId}, (spell) => ({ ${options.join(', ')} }))`,
      needsScalingHelper: false,
    }
  }

  // A single-hit ability needs no damage override: grimoire's value already is the hit, and
  // `spell.damage * 1` is just noise.
  if (candidate.grimoireDamage && ticks <= 1) {
    const suffix = options.length > 0 ? `, { ${options.join(', ')} }` : ''
    return {
      varName: name,
      code: `const ${name} = ${fn}(${candidate.primarySpellId}${suffix})`,
      needsScalingHelper: false,
    }
  }

  if (candidate.grimoireDamage) {
    options.unshift(`damage: spell.damage * ${ticks}`)
    return {
      varName: name,
      code: `const ${name} = ${fn}(${candidate.primarySpellId}, (spell) => ({ ${options.join(', ')} }))`,
      needsScalingHelper: false,
    }
  }

  // No grimoire effect at all — the only route is the season multiplier and the logs.
  const perTick = candidate.baseDamageP50 / Math.max(1, candidate.medianTicks)
  const observedCoefficient = coefficient(perTick)
  const damage = observedCoefficient
    ? `scalingTickingDamage(${ticks}, ${observedCoefficient})`
    : String(Math.round(perTick * ticks))

  options.unshift(`damage: ${damage}`)
  return {
    varName: name,
    code: `const ${name} = ${fn}(${candidate.primarySpellId}, () => ({ ${options.join(', ')} }))`,
    needsScalingHelper: observedCoefficient !== null,
  }
}

/** Spell ids already declared in an ability file, so re-runs don't duplicate them. */
export function spellIdsInSource(source: string): Set<number> {
  return new Set(
    [...source.matchAll(/(?:bossSpell|trashSpell|getEnemySpell)\(\s*(\d+)/g)].map((match) =>
      Number(match[1]),
    ),
  )
}
