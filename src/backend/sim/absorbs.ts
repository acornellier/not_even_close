import type { Ability, AbsorbOptions, SelectedAbility } from '../ability'
import type { CharacterPartialResult, EnemyAbilityDetails } from './simTypes'
import { willOfTheNecropolis } from '../classAbilities/deathKnight'
import type { ClassSpec } from '../classes'
import { classSpecs, equalSpecs } from '../classes'
import { baseHp } from '../stats.ts'
import { desperateInstincts } from '../classAbilities/demonHunter.ts'

export function findAssociatedCharacter<T extends { spec: ClassSpec }>(
  ability: Ability,
  items: Array<T>,
) {
  return items.find(
    ({ spec }) =>
      (ability.associatedClass && spec.class === ability.associatedClass) ||
      (ability.associatedSpec && equalSpecs(spec, ability.associatedSpec)),
  )
}

function absorbMainStatAmount(absorb: AbsorbOptions, charResult: CharacterPartialResult) {
  if (absorb.spMultipler) {
    const sp = charResult.adjustedStats.mainStat
    return sp * absorb.spMultipler
  } else if (absorb.apMultipler) {
    // For intellect classes, AP = SP * 1.04
    // For other classes, AP scales off Weapon DPS. We simply estimate weapon dps effect to be 1.2
    const isIntellect =
      classSpecs[charResult.spec.class][charResult.spec.spec]!.mainStat === 'intellect'
    const apMultiplier = isIntellect ? 1.04 : 1.02
    const ap = charResult.adjustedStats.mainStat * apMultiplier
    return ap * absorb.apMultipler
  }

  return 0
}

export function calculateAbsorb(
  absorb: AbsorbOptions,
  stacks: number | undefined,
  charResult: CharacterPartialResult,
) {
  const versMultiplier = absorb.versAffected ? charResult.adjustedStats.versatility : 0
  const healthAmount = (absorb.healthMultiplier ?? 0) * charResult.startingHealth
  const mainStatAmount = absorbMainStatAmount(absorb, charResult)

  return Math.floor(
    (healthAmount + mainStatAmount) * (stacks ?? 1) * (1 + versMultiplier),
  )
}

export function getMultiplierAbsorb(
  absorb: AbsorbOptions,
  ability: Ability,
  stacks: number | undefined,
  charResult: CharacterPartialResult | null,
  charPartialResults: CharacterPartialResult[],
) {
  if (!absorb.healthMultiplier && !absorb.spMultipler && !absorb.apMultipler) return 0

  if (ability.associatedClass || ability.associatedSpec) {
    const associatedCharacter = findAssociatedCharacter(ability, charPartialResults)
    if (associatedCharacter) {
      return calculateAbsorb(absorb, stacks, associatedCharacter)
    } else {
      return (absorb.healthMultiplier ?? 0) * baseHp
    }
  } else if (charResult) {
    return calculateAbsorb(absorb, stacks, charResult)
  }

  return 0
}

export function getAbsorb(
  absorb: AbsorbOptions,
  ability: Ability,
  stacks: number | undefined,
  charResult: CharacterPartialResult | null,
  charPartialResults: CharacterPartialResult[],
) {
  if (absorb.raw) {
    let absorbValue = absorb.raw
    if (absorb.versAffected)
      absorbValue *= 1 + (charResult?.adjustedStats.versatility ?? 0)
    return Math.floor(absorbValue)
  } else {
    return getMultiplierAbsorb(absorb, ability, stacks, charResult, charPartialResults)
  }
}

export function getAbsorbs(
  charResult: CharacterPartialResult,
  customAbsorbs: number[],
  enemyAbilityDetails: EnemyAbilityDetails,
  charPartialResults: CharacterPartialResult[],
) {
  let absorbs = 0

  for (const selectedAbility of charResult.abilities) {
    const { absorb } = selectedAbility.ability

    if (
      !absorb ||
      (absorb.absorbType === 'magic' && enemyAbilityDetails.physical) ||
      (absorb.absorbType === 'physical' && !enemyAbilityDetails.physical)
    ) {
      continue
    }

    absorbs += getAbsorb(
      absorb,
      selectedAbility.ability,
      selectedAbility.stacks,
      charResult,
      charPartialResults,
    )
  }

  absorbs += customAbsorbs.reduce((acc, val) => acc + val, 0)

  return Math.floor(absorbs)
}

export function getExtraAbsorbs(
  abilities: SelectedAbility[],
  startingHealth: number,
  actualDamageTaken: number,
) {
  let extraAbsorbs = 0

  for (const { ability, stacks } of abilities) {
    if (ability.id === willOfTheNecropolis.id) {
      const damageToReach30 = startingHealth * 0.7
      const damageTakenBelow30 = actualDamageTaken - damageToReach30
      if (damageTakenBelow30 <= 0) continue

      const multiplier = (stacks ?? 2) < 2 ? 0.2 : 0.35
      extraAbsorbs += damageTakenBelow30 * multiplier
    } else if (ability.id === desperateInstincts.id) {
      const damageToReach35 = startingHealth * 0.65
      const damageTakenBelow35 = actualDamageTaken - damageToReach35
      if (damageTakenBelow35 <= 0) continue

      const multiplier = 0.1
      extraAbsorbs += damageTakenBelow35 * multiplier
    }
  }

  return Math.floor(extraAbsorbs)
}
