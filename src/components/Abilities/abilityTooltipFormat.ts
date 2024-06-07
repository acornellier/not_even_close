import type {
  Ability,
  AbilityAugmentation,
  AbilityField,
  AbsorbOptions,
  SelectedAbility,
  StackOptions,
} from '../../backend/ability.ts'
import { formatNumber, getStackedValue, roundHundred } from '../../util/utils.ts'
import { barkskin } from '../../backend/classAbilities/druid.ts'

function getStackArray(stacks: StackOptions | undefined, selectedStacks?: number) {
  return !stacks || stacks.type === 'stacks'
    ? [selectedStacks && stacks ? selectedStacks : 1]
    : Array.from({ length: stacks.max }, (_, index) => index + 1)
}

function mapStacks(
  value: number,
  stackArray: number[],
  stackOptions: StackOptions | undefined,
  formatter: (v: number) => number | string,
) {
  return stackArray
    .map((stack) => getStackedValue(value, stack, stackOptions))
    .map(formatter)
    .join('/')
}

function getAbsorbText(absorb: AbsorbOptions, { stacks }: Ability) {
  const stackArray = getStackArray(stacks)

  const absorbs = []
  if (absorb.raw) {
    const values = mapStacks(absorb.raw, stackArray, stacks, formatNumber)
    absorbs.push(`${values} HP`)
  } else if (absorb.healthMultiplier) {
    const values = mapStacks(absorb.healthMultiplier, stackArray, stacks, roundHundred)
    absorbs.push(`${values}% HP`)
  }

  if (absorb.spMultipler) {
    absorbs.push(`${roundHundred(absorb.spMultipler)}% SP`)
  } else if (absorb.apMultipler) {
    absorbs.push(`${roundHundred(absorb.apMultipler)}% AP`)
  }

  if (!absorbs.length) return ''

  let str = absorbs.join(' + ')

  str += ` ${absorb.absorbType ? absorb.absorbType + ' ' : ''}absorb`

  if (absorb.versAffected) str += ' (+vers)'

  return str
}

export function getExtraAbsorbText(calculatedAbsorb: number) {
  if (!calculatedAbsorb) return ''

  return ` - ${formatNumber(calculatedAbsorb)} absorb`
}

function getNumberText(
  field: AbilityField,
  value: number,
  { drType, stacks }: Ability,
  selectedStacks?: number,
) {
  const stackArray = getStackArray(stacks, selectedStacks)

  const values = mapStacks(value, stackArray, stacks, (calculatedValue) =>
    field === 'versRawIncrease' || field === 'armorRawIncrease'
      ? formatNumber(calculatedValue)
      : roundHundred(calculatedValue),
  )

  switch (field) {
    case 'dr':
      return `${values}% ${drType ? drType + ' ' : ''}DR`
    case 'aoeDr':
      return `${values}% AoE DR`
    case 'damageDealtReduction':
      return `${values}% less enemy damage`
    case 'healthIncrease':
      return `${values}% HP`
    case 'staminaIncrease':
      return `${values}% stamina`
    case 'versIncrease':
      return `${values}% versatility`
    case 'versRawIncrease':
      return `${values} versatility`
    case 'armorIncrease':
      return `${values}% armor`
    case 'armorRawIncrease':
      return `${values} armor`
    default:
      console.error(`Unknown ability field: ${field}`)
      return 'Error'
  }
}

export function getEffectText<T extends AbilityField>(
  field: T,
  value: Ability[T],
  ability: Ability,
  selectedAbility: SelectedAbility | undefined,
) {
  let text = ''
  if (field === 'absorb') {
    text += getAbsorbText(value as AbsorbOptions, ability)
  } else {
    text += getNumberText(field, value as number, ability)
  }

  if (ability?.stacks?.type === 'stacks') {
    text += ` per stack`
    if (selectedAbility && field !== 'absorb')
      text += ` - ${getNumberText(field, value as number, ability, selectedAbility.stacks)}`
  }

  return text
}

export function getAugmentationText(
  augmentation: AbilityAugmentation,
  ability: Ability,
  selectedAbility: SelectedAbility | undefined,
) {
  if (augmentation.field === 'absorb' && augmentation.absorbField === 'healthMultiplier')
    return `${augmentation.value * 100}% more absorb`

  if (augmentation.otherSpellId === barkskin.id)
    return `+${augmentation.value * 100}% AP absorb`

  return `+${getEffectText(augmentation.field, augmentation.value, ability, selectedAbility)}`
}
