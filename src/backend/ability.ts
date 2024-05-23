import type { ClassSpec, WowClass } from './classes'

export type DamageType = 'magic' | 'physical'

export type AbsorbOptions = {
  raw?: number
  healthMultiplier?: number
  absorbType?: DamageType
  apMultipler?: number
  spMultipler?: number
  versAffected?: boolean
  backup?: number
}

export type StackOptions = {
  type: 'talent' | 'stacks'
  max: number
  default?: number
  values?: number[]
}

export type Ability = {
  name: string
  spellId: number
  onByDefault?: boolean

  dr?: number
  drType?: DamageType
  aoeDr?: number
  damageDealtReduction?: number
  staminaIncrease?: number
  versIncrease?: number
  versRawIncrease?: number
  healthIncrease?: number
  armorIncrease?: number
  absorb?: AbsorbOptions
  stacks?: StackOptions

  abilityAugmentations?: AbilityAugmentation[]
  associatedClass?: WowClass
  associatedSpec?: ClassSpec

  iconName: string
  wowheadLink?: string
  notes?: string
}

export type SelectedAbility = {
  ability: Ability
  stacks?: number
}

export const abilityEffectFields = [
  'dr',
  'aoeDr',
  'damageDealtReduction',
  'staminaIncrease',
  'versIncrease',
  'versRawIncrease',
  'healthIncrease',
  'armorIncrease',
  'absorb',
] as const

export type AbilityField = (typeof abilityEffectFields)[number]
export type AbsorbField = keyof AbsorbOptions
export type AbsorbAugmentations = Exclude<AbsorbField, 'versAffected' | 'absorbType'>

export type AbilityAugmentation = {
  otherSpellId: number
  field: AbilityField
  absorbField?: Exclude<AbsorbField, 'versAffected' | 'absorbType'>
  value: number
}
