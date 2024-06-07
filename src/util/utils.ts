import type {
  Ability,
  SelectedAbility,
  SelectedAbilityId,
  StackOptions,
} from '../backend/ability.ts'
import { abilitiesById } from '../backend/ability.ts'
import type { EnemyAbility } from '../backend/enemyAbilities/enemies.ts'
import type { EnemyAbilityDetails } from '../backend/sim/simTypes.ts'

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

export function mapBy<T extends object>(array: T[], field: keyof T) {
  return array.reduce(
    (acc, item) => {
      acc[item[field] as number] = item
      return acc
    },
    {} as Record<number, T>,
  )
}

export function groupBy<T extends object>(array: T[], field: keyof T) {
  return array.reduce(
    (acc, item) => {
      const key = item[field] as number
      acc[key] ??= []
      acc[key]!.push(item)
      return acc
    },
    {} as Record<number, T[]>,
  )
}

export function getSelectedAbility(
  spellId: number,
  selectedAbilities: SelectedAbilityId[],
) {
  return selectedAbilities.find(({ abilityId }) => abilityId === spellId)
}

export function isAbilitySelected(
  spellId: number,
  selectedAbilities: SelectedAbilityId[],
) {
  return !!getSelectedAbility(spellId, selectedAbilities)
}

export function findMatchingAbility(spellId: number, abilities: Ability[]) {
  return abilities.find((ability) => ability.id === spellId)
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
  augmentingAbility: SelectedAbilityId,
  selectedAbilities: SelectedAbilityId[],
) {
  const { abilityId, stacks } = augmentingAbility
  const ability = abilitiesById[abilityId]
  if (!ability) return

  const { abilityAugmentations, stacks: stackOptions } = ability

  if (
    !abilityAugmentations ||
    !isAbilitySelected(augmentingAbility.abilityId, selectedAbilities)
  )
    return

  abilityAugmentations.forEach(({ otherAbilityId, field, absorbField, value }) => {
    if (otherAbilityId !== abilityToAugment.id) return

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
  selectedAbilities: SelectedAbilityId[],
): Ability[] {
  return abilitiesToAugment.map<Ability>((ability) => {
    const augmentedAbility = { ...ability }

    selectedAbilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility, selectedAbilities),
    )

    return augmentedAbility
  })
}

export function augmentSelectedAbilityIds(
  abilitiesToAugment: SelectedAbility[],
  selectedAbilities: SelectedAbilityId[],
): SelectedAbility[] {
  return abilitiesToAugment.map<SelectedAbility>(({ ability, stacks }) => {
    const augmentedAbility = { ...ability }

    selectedAbilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility, selectedAbilities),
    )

    return { ability: augmentedAbility, stacks }
  })
}

export function mapSelectedAbilityIds(
  selectedAbilities: SelectedAbilityId[],
): SelectedAbility[] {
  return selectedAbilities
    .map(({ abilityId, stacks }) => {
      const ability = abilitiesById[abilityId]
      if (!ability) {
        console.error(`Invalid ability ID: ${abilityId}`)
        return null
      }

      return { ability, stacks }
    })
    .filter(Boolean) as SelectedAbility[]
}

export function isAbilityAvailable(abilityId: number, availableAbililties: Ability[]) {
  return availableAbililties.some((availableAbility) => availableAbility.id === abilityId)
}

export function enemyAbilityToDetails(ability: EnemyAbility): EnemyAbilityDetails {
  let damage = ability.damage
  if (ability.variance) damage = Math.round(damage * (1 + ability.variance))

  return { ...ability, damage }
}
