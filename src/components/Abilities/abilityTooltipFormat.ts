import type {
  Ability,
  AbilityAugmentation,
  AbilityField,
  AbsorbOptions,
  StackOptions,
} from '../../backend/ability.ts'
import { getStackedValue, roundHundred } from '../../backend/utils.ts'
import { barkskin } from '../../backend/classAbilities/druid.ts'

function getStackArray(stacks: StackOptions | undefined) {
  return !stacks || stacks.type === 'stacks'
    ? [1]
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
    const values = mapStacks(absorb.raw, stackArray, stacks, (v) =>
      v.toLocaleString('en-US'),
    )
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

  return ` - ${calculatedAbsorb.toLocaleString('en-US')} absorb`
}

function getNumberText(field: AbilityField, value: number, { drType, stacks }: Ability) {
  const stackArray = getStackArray(stacks)

  const values = mapStacks(value, stackArray, stacks, (calculatedValue) =>
    field === 'versRawIncrease' ? calculatedValue : roundHundred(calculatedValue),
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
    default:
      console.error(`Unknown ability field: ${field}`)
      return 'Error'
  }
}

export function getEffectText<T extends AbilityField>(
  field: T,
  value: Ability[T],
  ability: Ability,
) {
  let text = ''
  if (field === 'absorb') {
    text += getAbsorbText(value as AbsorbOptions, ability)
  } else {
    text += getNumberText(field, value as number, ability)
  }

  if (ability?.stacks?.type === 'stacks') text += ` per stack`

  return text
}

export function getAugmentationText(augmentation: AbilityAugmentation, ability: Ability) {
  if (augmentation.field === 'absorb' && augmentation.absorbField === 'healthMultiplier')
    return `${augmentation.value * 100}% more absorb`

  if (augmentation.otherSpellId === barkskin.spellId)
    return `+${augmentation.value * 100}% AP absorb`

  return `+${getEffectText(augmentation.field, augmentation.value, ability)}`
}
