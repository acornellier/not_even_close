import { Ability, AbsorbOptions } from '../ability'
import { CharacterPartialResult, EnemyAbilityDetails } from './simTypes'
import { willOfTheNecropolis } from '../classAbilities/deathKnight'
import { ClassSpec, equalSpecs } from '../classes'

export function findAssociatedCharacter<T extends { spec: ClassSpec }>(
  ability: Ability,
  items: Array<T>
) {
  return items.find(
    ({ spec }) =>
      (ability.associatedClass && spec.class === ability.associatedClass) ||
      (ability.associatedSpec && equalSpecs(spec, ability.associatedSpec))
  )
}

// SP = Main stat
// For intellect classes, AP = SP * 1.04
// For other classes, AP scales off Weapon DPS. We simply estimate weapon dps effect to be 1.3
function absorbMainStatAmount(absorb: AbsorbOptions, charResult: CharacterPartialResult) {
  if (absorb.spMultipler) {
    const sp = charResult.adjustedStats.mainStat
    return sp * absorb.spMultipler
  } else if (absorb.apMultipler) {
    const ap = charResult.adjustedStats.mainStat * 1.2
    return ap * absorb.apMultipler
  }

  return 0
}

export function calculateAbsorb(
  absorb: AbsorbOptions,
  charResult: CharacterPartialResult
) {
  const versMultiplier = absorb.versAffected ? charResult.adjustedStats.versatility : 0
  const healthAmount = (absorb.healthMultiplier ?? 0) * charResult.startingHealth
  const mainStatAmount = absorbMainStatAmount(absorb, charResult)

  return Math.round((healthAmount + mainStatAmount) * (1 + versMultiplier))
}

export function getMultiplierAbsorb(
  absorb: AbsorbOptions,
  ability: Ability,
  charResult: CharacterPartialResult | null,
  charPartialResults: CharacterPartialResult[]
) {
  if (!absorb.healthMultiplier && !absorb.spMultipler && !absorb.apMultipler) return 0

  if (ability.associatedClass || ability.associatedSpec) {
    const associatedCharacter = findAssociatedCharacter(ability, charPartialResults)
    if (associatedCharacter) {
      return calculateAbsorb(absorb, associatedCharacter)
    } else if (absorb.backup) {
      return absorb.backup
    }
  } else if (charResult) {
    return calculateAbsorb(absorb, charResult)
  }

  return 0
}

export function getAbsorbs(
  charResult: CharacterPartialResult,
  customAbsorbs: number[],
  enemyAbilityDetails: EnemyAbilityDetails,
  charPartialResults: CharacterPartialResult[]
) {
  let absorbs = 0

  for (const ability of charResult.abilities) {
    const { absorb } = ability

    if (
      !absorb ||
      (absorb.absorbType === 'magic' && enemyAbilityDetails.physical) ||
      (absorb.absorbType === 'physical' && !enemyAbilityDetails.physical)
    ) {
      continue
    }

    if (absorb.raw) {
      let absorbValue = absorb.raw
      if (absorb.versAffected) absorbValue *= 1 + charResult.adjustedStats.versatility
      absorbs += absorbValue
    } else {
      absorbs += getMultiplierAbsorb(absorb, ability, charResult, charPartialResults)
    }
  }

  absorbs += customAbsorbs.reduce((acc, val) => acc + val, 0)

  return Math.round(absorbs)
}

export function getExtraAbsorbs(
  abilities: Ability[],
  startingHealth: number,
  absorbs: number,
  actualDamageTaken: number
) {
  let extraAbsorbs = 0

  for (const ability of abilities) {
    if (ability.spellId === willOfTheNecropolis.spellId) {
      const damageToReach30 = startingHealth + absorbs - startingHealth * 0.3
      const damageTakenBelow30 = actualDamageTaken - damageToReach30
      if (damageTakenBelow30 <= 0) continue

      extraAbsorbs += damageTakenBelow30 * 0.35
    }
  }

  return Math.round(extraAbsorbs)
}
