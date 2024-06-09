import type { ClassSpec, WowClass } from './classes'
import { classSpecs } from './classes'
import { externals } from './groupAbilities/externals.ts'
import { groupBuffs } from './groupAbilities/groupBuffs.ts'
import { groupActives } from './groupAbilities/groupActives.ts'
import { groupBy, mapBy } from '../util/utils.ts'
import { druidReplacements } from './classAbilities/druid.ts'

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
  id: number
  icon: string
  onByDefault?: boolean
  notes?: string
  heroTree?: string

  dr?: number
  drType?: DamageType
  aoeDr?: number
  damageDealtReduction?: number
  staminaIncrease?: number
  versIncrease?: number
  versRawIncrease?: number
  healthIncrease?: number
  armorIncrease?: number
  armorRawIncrease?: number
  absorb?: AbsorbOptions
  stacks?: StackOptions

  abilityAugmentations?: AbilityAugmentation[]
  associatedClass?: WowClass
  associatedSpec?: ClassSpec
  replacedBy?: number
}

export type SelectedAbilityId = {
  abilityId: number
  stacks?: number
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
  'armorRawIncrease',
  'absorb',
] as const

export type AbilityField = (typeof abilityEffectFields)[number]
export type AbsorbField = keyof AbsorbOptions
export type AbsorbAugmentations = Exclude<AbsorbField, 'versAffected' | 'absorbType'>

export type AbilityAugmentation = {
  otherAbilityId: number
  field: AbilityField
  absorbField?: AbsorbAugmentations
  value: number
}

export type AbilityReplacement = {
  sourceId: number
  targetId: number
}

const specAbilities = Object.values(classSpecs)
  .flatMap((specs) => Object.values(specs))
  .flatMap(({ abilities }) => abilities)

export const allAbilities: Ability[] = [
  ...specAbilities,
  ...externals,
  ...groupBuffs,
  ...groupActives,
  ...druidReplacements,
]

export const abilitiesById = mapBy(allAbilities, 'id')

for (const abilities of Object.values(groupBy(allAbilities, 'id'))) {
  const uniqueAbilities = new Set(abilities)
  if (uniqueAbilities.size === 1) continue

  throw new Error(
    `Multiple abilities with same ID: ${[...uniqueAbilities].map(({ name }) => name).join(', ')}`,
  )
}
