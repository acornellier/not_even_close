import type { Ability } from '../ability'

const inherentResistanceAug: Ability = {
  name: 'Inherent Resistance',
  dr: 0.04,
  drType: 'magic',
  stacks: { type: 'talent', max: 2 },
  onByDefault: true,
  id: 375544,
  icon: 'inv_misc_rubysanctum1',
}

const inherentResistanceDevPres: Ability = {
  ...inherentResistanceAug,
  id: inherentResistanceAug.id + 1,
  dr: 0.04,
}

const obsidianScales: Ability = {
  name: 'Obsidian Scales',
  dr: 0.3,
  id: 363916,
  icon: 'inv_artifact_dragonscales',
}

const rushOfVitality: Ability = {
  name: 'Rush of Vitality',
  healthIncrease: 0.2,
  id: 377086,
  icon: 'trade_enchanting_greatermysteriousessence',
}

const hardenedScales: Ability = {
  name: 'Hardened Scales',
  id: 441675,
  icon: 'inv_10_skinning_scales_black',
  heroTree: 'Scalecommander',
  abilityAugmentations: [
    {
      otherAbilityId: obsidianScales.id,
      field: 'dr',
      value: 0.05,
    },
  ],
}

const temporality: Ability = {
  name: 'Temporality',
  id: 441181,
  icon: 'ability_evoker_return',
  heroTree: 'Chronowarden',
  dr: 0.05,
  notes: 'Decays from 20% over 3 seconds',
  stacks: {
    type: 'stacks',
    max: 4,
    default: 2,
  },
}

export const evokerAugAbilities = [
  inherentResistanceAug,
  hardenedScales,
  temporality,
  obsidianScales,
]

export const evokerDevAbilities = [
  inherentResistanceDevPres,
  hardenedScales,
  obsidianScales,
]

export const evokerPresAbilities = [
  inherentResistanceDevPres,
  rushOfVitality,
  temporality,
  obsidianScales,
]
