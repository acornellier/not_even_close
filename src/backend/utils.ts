import type { Ability, SelectedAbility, StackOptions } from './ability'
import type { EnemyAbility } from './enemyAbilities/enemies'

import type { EnemyAbilityDetails } from './sim/simTypes'

export function roundTo(number: number, to: number) {
  return Math.round(number * 10 ** to) / 10 ** to
}

export function roundHundred(number: number) {
  return roundTo(number * 100, 2)
}

export function formatNumber(number: number) {
  return number.toLocaleString('en-US')
}

export function shortRoundedNumber(number: number) {
  const absNumber = Math.abs(number)
  if (absNumber <= 9_999) return formatNumber(Math.round(number))
  if (absNumber <= 999_999) return `${formatNumber(Math.round(number / 1_000))}K`
  return `${formatNumber(roundTo(number / 1_000_000, 2))}M`
}

export function getSelectedAbility(
  spellId: number,
  selectedAbilities: SelectedAbility[],
) {
  return selectedAbilities.find(({ ability }) => ability.spellId === spellId)
}

export function isAbilitySelected(spellId: number, selectedAbilities: SelectedAbility[]) {
  return !!getSelectedAbility(spellId, selectedAbilities)
}

export function findMatchingAbility(spellId: number, abilities: Ability[]) {
  return abilities.find((ability) => ability.spellId === spellId)
}

export function defaultStacks(stacks: StackOptions) {
  return stacks?.default ?? stacks.max
}

export function getStackedValue(
  value: number,
  stackCount: number | undefined,
  stackOptions: StackOptions | undefined,
) {
  if (stackCount === undefined) return value

  if (stackOptions?.values) {
    const arrValue = stackOptions.values[stackCount - 1]
    if (arrValue) {
      return arrValue
    } else {
      console.error(`Stacks array does not contain value for stack count ${stackCount}`)
    }
  }

  return value * stackCount
}

function augmentAbility(
  abilityToAugment: Ability,
  augmentingAbility: SelectedAbility,
  selectedAbilities: SelectedAbility[],
) {
  const {
    ability: { abilityAugmentations, stacks: stackOptions },
    stacks,
  } = augmentingAbility

  if (
    !abilityAugmentations ||
    !isAbilitySelected(augmentingAbility.ability.spellId, selectedAbilities)
  )
    return

  abilityAugmentations.forEach(({ otherSpellId, field, absorbField, value }) => {
    if (otherSpellId !== abilityToAugment.spellId) return

    const stackedValue = getStackedValue(value, stacks, stackOptions)

    if (field === 'absorb') {
      const absorb = abilityToAugment.absorb
      if (!absorb || !absorbField) return

      abilityToAugment.absorb = { ...absorb }

      abilityToAugment.absorb[absorbField] ??= 0
      if (absorbField === 'healthMultiplier') {
        abilityToAugment.absorb[absorbField]! *= 1 + stackedValue
      } else {
        abilityToAugment.absorb[absorbField]! += stackedValue
      }
    } else {
      abilityToAugment[field] ??= 0
      abilityToAugment[field]! += stackedValue
    }
  })
}

export function augmentAbilities(
  abilitiesToAugment: Ability[],
  selectedAbilities: SelectedAbility[],
) {
  return abilitiesToAugment.map<Ability>((ability) => {
    const augmentedAbility = { ...ability }

    selectedAbilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility, selectedAbilities),
    )

    return augmentedAbility
  })
}

export function augmentSelectedAbilities(
  abilitiesToAugment: SelectedAbility[],
  selectedAbilities: SelectedAbility[],
) {
  return abilitiesToAugment.map<SelectedAbility>((ability) => {
    const augmentedAbility = { ...ability.ability }

    selectedAbilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility, selectedAbilities),
    )

    return { ...ability, ability: augmentedAbility }
  })
}

export function isAbilityAvailable(ability: Ability, availableAbililties: Ability[]) {
  return availableAbililties.some(
    (availableAbility) => availableAbility.spellId === ability.spellId,
  )
}

export function enemyAbilityToDetails(ability: EnemyAbility): EnemyAbilityDetails {
  let damage = ability.damage
  if (ability.variance) damage = Math.round(damage * (1 + ability.variance))

  return { ...ability, damage }
}
