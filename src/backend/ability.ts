import { ClassSpec, WowClass } from './classes'

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

export type Ability = {
  name: string
  spellId: number
  onByDefault?: boolean

  dr?: number
  drType?: DamageType
  aoeDr?: number
  staminaIncrease?: number
  versIncrease?: number
  versRawIncrease?: number
  healthIncrease?: number

  absorb?: AbsorbOptions

  abilityAugmentations?: AbilityAugmentation[]
  associatedClass?: WowClass
  associatedSpec?: ClassSpec
  talentPoints?: number

  iconName: string
  wowheadLink?: string
  notes?: string
}

export const abilityFields = [
  'dr',
  'aoeDr',
  'staminaIncrease',
  'versIncrease',
  'versRawIncrease',
  'healthIncrease',
  'absorb',
] as const

export type AbilityField = typeof abilityFields[number]
export type AbsorbField = keyof AbsorbOptions
export type AbsorbAugmentations = Exclude<AbsorbField, 'versAffected' | 'absorbType'>

export type AbilityAugmentation = {
  otherSpellId: number
  field: AbilityField
  absorbField?: Exclude<AbsorbField, 'versAffected' | 'absorbType'>
  value: number
}
