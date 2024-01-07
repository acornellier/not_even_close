export type Ability = {
  name: string
  spellId: number
  abilityAugmentations?: AbilityAugmentation[]
  onByDefault?: boolean
  dr?: number
  aoeDr?: number
  staminaIncrease?: number
  versIncrease?: number
  healthIncrease?: number
  rawAbsorb?: number
  absorbHealthMultiplier?: number
  absorbVersAffected?: boolean
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
