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

export const evokerAugAbilities = [inherentResistanceAug, obsidianScales]

export const evokerDevAbilities = [inherentResistanceDevPres, obsidianScales]

export const evokerPresAbilities = [
  inherentResistanceDevPres,
  rushOfVitality,
  obsidianScales,
]
