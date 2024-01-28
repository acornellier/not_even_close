import { ClassSpec, WowClass } from './classes'

export type DamageType = 'magic' | 'physical'

export type Ability = {
  name: string
  spellId: number
  iconName: string
  abilityAugmentations?: AbilityAugmentation[]
  onByDefault?: boolean
  dr?: number
  drType?: DamageType
  absorbType?: DamageType
  aoeDr?: number
  staminaIncrease?: number
  versIncrease?: number
  healthIncrease?: number
  rawAbsorb?: number
  absorbHealthMultiplier?: number
  absorbVersAffected?: boolean
  associatedClass?: WowClass
  associatedSpec?: ClassSpec
  absorbBackup?: number
  talentPoints?: number
  wowheadLink?: string
  notes?: string
}

export const abilityFields = [
  'dr',
  'aoeDr',
  'staminaIncrease',
  'versIncrease',
  'healthIncrease',
  'rawAbsorb',
  'absorbHealthMultiplier',
] as const

export type AbilityField = typeof abilityFields[number]

export type AbilityAugmentation = {
  otherSpellId: number
  field: AbilityField
  value: number
}
