/**
 * Turns a scraped candidate into the ability the app ships.
 * Shared by reportAbilities.ts (shows the recipe) and writeAbilities.ts (writes the ability).
 */
import type { EnemyAbility } from '../src/backend/enemyAbilities/enemies.ts'
import type { AbilityCandidate } from './guessAbilities.ts'
import { bossSpell, scalingTickingDamage, trashSpell } from './grimoire.ts'
import { spellOverride } from './overrides/index.ts'

/** Beyond this, a DoT is sustained damage rather than a burst to survive. */
const LONG_DOT_MS = 6000
/** Only note the full-duration assumption when players observably fall short of it. */
const FULL_DURATION_FRACTION = 0.7

export interface SuggestedAbility {
  ability: EnemyAbility
  /** How the damage was put together, e.g. `spell.damage + spell.periodicDamage`. */
  recipe: string
}

/**
 * Damage is authored at full duration: the app answers "can I survive this", so the worst case
 * is the useful number.
 *
 * Tick counts come from grimoire's DBC data when available — exact, and a property of the spell.
 * The observed p95 is only a fallback for spells grimoire has no periodic data for, and it
 * measures how long players stood in something rather than how long it lasts.
 */
export function suggestedAbility(
  dungeonKey: string,
  candidate: AbilityCandidate,
  multiplier: number | null,
): SuggestedAbility {
  const options: Partial<EnemyAbility> = {}

  // Hand-made calls from overrides/<dungeon>.ts, applied on every run.
  const override = spellOverride(dungeonKey, candidate.spellIds)

  // Dropping the DoT leaves just the direct hit, which is grimoire's default damage.
  const initialHitOnly = Boolean(override?.initialHitOnly && candidate.grimoireDirectDamage)
  const grimoireTicks = initialHitOnly ? null : candidate.grimoirePeriodicTicks
  const ticks = initialHitOnly ? 1 : (override?.ticks ?? grimoireTicks ?? candidate.p95Ticks)

  // The sim models one instantaneous hit, so a long DoT's full-duration total is damage spread
  // over many seconds of healing rather than something to survive at once. Authored at full
  // duration anyway, but say so.
  if (
    candidate.grimoireDuration &&
    candidate.grimoireDuration > LONG_DOT_MS &&
    grimoireTicks &&
    grimoireTicks > 1 &&
    candidate.medianTickEvents < grimoireTicks * FULL_DURATION_FRACTION
  ) {
    options.notes = `Assumes full duration (${Math.round(candidate.grimoireDuration / 1000)}s); players typically took ${candidate.medianTickEvents} of ${grimoireTicks} ticks.`
  }

  if (override?.avoidable) options.avoidable = true
  if (override?.ignoresArmor) options.ignoresArmor = true
  if (override?.notes) options.notes = override.notes

  if (candidate.tankOnly) options.tankOnly = true
  if (ticks > 1) options.periodic = true
  if (candidate.aoeFraction > 0.5) options.aoe = true

  const split = override?.splitBetween

  const resolve = (recipe: string, damage?: (spell: EnemyAbility) => number) => {
    const spell = (candidate.isBoss ? bossSpell : trashSpell)(candidate.primarySpellId, (spell) => {
      const total = damage ? damage(spell) : spell.damage
      return split || damage ? { damage: split ? total / split : total, ...options } : options
    })
    return { ability: spell, recipe: split ? `(${recipe}) / ${split}` : recipe }
  }

  // Direct hit plus a DoT. Both halves come off the resolved spell, so the next grimoire bump
  // picks up any retuning of either.
  if (
    !initialHitOnly &&
    candidate.grimoireDirectDamage &&
    candidate.grimoirePeriodicDamage &&
    grimoireTicks
  ) {
    return resolve(
      'spell.damage + spell.periodicDamage',
      (spell) => spell.damage + spell.periodicDamage,
    )
  }

  // Pure DoT: the resolved damage is one tick, and periodicDamage is the full duration.
  if (grimoireTicks && grimoireTicks > 1 && !candidate.grimoireDirectDamage) {
    return resolve('spell.periodicDamage', (spell) => spell.periodicDamage)
  }

  // A single hit: grimoire's value already is the hit.
  if (candidate.grimoireDamage && ticks <= 1) {
    return resolve('spell.damage')
  }

  if (candidate.grimoireDamage) {
    return resolve(`spell.damage * ${ticks}`, (spell) => spell.damage * ticks)
  }

  // No grimoire effect at all — the only route is the season multiplier and the logs.
  const perTick = candidate.baseDamageP50 / Math.max(1, candidate.medianTicks)
  const coefficient = multiplier ? Math.round(perTick / multiplier) : null
  if (coefficient) {
    return resolve(`season multiplier * ${coefficient} * ${ticks}`, () =>
      scalingTickingDamage(ticks, coefficient),
    )
  }
  const observed = Math.round(perTick * ticks)
  return resolve(`${observed} (observed)`, () => observed)
}

/** One line describing a suggested ability, for logs and reports. */
export function describe({ ability, recipe }: SuggestedAbility) {
  const flags = (
    ['avoidable', 'ignoresArmor', 'tankOnly', 'periodic', 'aoe', 'trashAbility'] as const
  ).filter((flag) => ability[flag])
  const notes = ability.notes ? ` — ${ability.notes}` : ''
  return `${ability.name} (${ability.id}): ${Math.round(ability.damage)} = ${recipe}${flags.length ? ` [${flags.join(', ')}]` : ''}${notes}`
}
