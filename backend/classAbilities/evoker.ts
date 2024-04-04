import { Ability } from '../ability'

const inherentResistanceAug: Ability = {
  name: 'Inherent Resistance',
  dr: 0.04,
  drType: 'magic',
  onByDefault: true,
  spellId: 375544,
  iconName: 'inv_misc_rubysanctum1',
}

const inherentResistanceDevPres: Ability = {
  ...inherentResistanceAug,
  dr: 0.08,
}

const obsidianScales: Ability = {
  name: 'Obsidian Scales',
  dr: 0.3,
  spellId: 363916,
  iconName: 'inv_artifact_dragonscales',
  wowheadLink: 'https://www.wowhead.com/spell=363916/obsidian-scales',
}

const rushOfVitality: Ability = {
  name: 'Rush of Vitality',
  healthIncrease: 0.2,
  spellId: 377086,
  iconName: 'trade_enchanting_greatermysteriousessence',
}

export const evokerAugAbilities = [inherentResistanceAug, obsidianScales]

export const evokerDevAbilities = [inherentResistanceDevPres, obsidianScales]

export const evokerPresAbilities = [
  inherentResistanceDevPres,
  rushOfVitality,
  obsidianScales,
]
