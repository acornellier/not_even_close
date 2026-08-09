/**
 * Key-level / affix damage scaling.
 *
 * This MUST stay in sync with `getScalingFactor` in src/backend/sim/sim.ts and the affix
 * predicates in src/util/utils.ts. The app authors ability damage at a +1 baseline and scales
 * up at sim time; the scraper observes damage at whatever key level the log happened to be, so
 * it has to divide the same factor back out.
 */

/** Both Fortified and Tyrannical are active from +10 up (utils.ts bothFortTyranActive). */
export const BOTH_AFFIXES_KEY_LEVEL = 10

/**
 * Mirrors sim.ts getScalingFactor. Note the sim rounds to 2 decimals for display; we
 * deliberately do NOT round here, since this is a divisor and the rounding compounds.
 */
export function scalingFactor(
  keyLevel: number,
  isTrashAbility: boolean,
  isTyran = keyLevel >= BOTH_AFFIXES_KEY_LEVEL,
) {
  let factor = 1
  for (let level = 2; level <= keyLevel; ++level) {
    factor *= level >= 11 ? 1.1 : 1.07
  }

  const both = keyLevel >= BOTH_AFFIXES_KEY_LEVEL
  const fortActive = !isTyran || both
  const tyranActive = isTyran || both

  if (fortActive && isTrashAbility) {
    factor *= 1.2
  } else if (tyranActive && !isTrashAbility) {
    factor *= 1.15
  }

  return factor
}

/** Observed damage at `keyLevel` -> the +1 baseline the ability files are authored at. */
export function normalizeToBase(
  observedDamage: number,
  keyLevel: number,
  isTrashAbility: boolean,
) {
  return observedDamage / scalingFactor(keyLevel, isTrashAbility)
}

/** Baseline damage -> what it would hit for at `keyLevel`. */
export function scaleToKeyLevel(
  baseDamage: number,
  keyLevel: number,
  isTrashAbility: boolean,
) {
  return baseDamage * scalingFactor(keyLevel, isTrashAbility)
}

/**
 * The lowest key level at which this ability's damage meets or exceeds a player's health.
 * `pctMaxHp` is the observed fraction of max HP at `observedKeyLevel` (1 = exactly lethal).
 * Returns null if it never gets there within `maxKeyLevel`.
 */
export function oneShotKeyLevel(
  pctMaxHp: number,
  observedKeyLevel: number,
  isTrashAbility: boolean,
  maxKeyLevel = 40,
): number | null {
  if (pctMaxHp <= 0) return null
  const observed = scalingFactor(observedKeyLevel, isTrashAbility)

  for (let level = 2; level <= maxKeyLevel; ++level) {
    const ratio = pctMaxHp * (scalingFactor(level, isTrashAbility) / observed)
    if (ratio >= 1) return level
  }

  return null
}

/** Fraction of a player's max HP this ability hits for at `keyLevel`. */
export function pctMaxHpAtKeyLevel(
  pctMaxHp: number,
  observedKeyLevel: number,
  keyLevel: number,
  isTrashAbility: boolean,
) {
  return (
    pctMaxHp *
    (scalingFactor(keyLevel, isTrashAbility) /
      scalingFactor(observedKeyLevel, isTrashAbility))
  )
}
