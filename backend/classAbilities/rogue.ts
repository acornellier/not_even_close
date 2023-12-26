import { Ability } from '../ability'

export const feint: Ability = {
  name: 'Feint',
  aoeDr: 0.4,
  spellId: 1966,
  wowheadLink: 'https://www.wowhead.com/spell=1966/feint',
  iconName: 'ability_rogue_feint',
}

export const elusiveness: Ability = {
  name: 'Elusiveness',
  dr: 0.2,
  spellId: 79008,
  wowheadLink: 'https://www.wowhead.com/spell=79008/elusiveness',
  iconName: 'ability_rogue_turnthetables',
}

export const rogueAbilities = [feint, elusiveness]
