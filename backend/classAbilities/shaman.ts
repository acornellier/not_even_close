import { Ability } from '../ability'

export const elementalWardingEnh: Ability = {
  name: 'Elemental Warding',
  dr: 0.06,
  onByDefault: true,
  spellId: 381650,
  wowheadLink: 'https://www.wowhead.com/spell=381650/elemental-warding',
  iconName: 'inv_10_elementalcombinedfoozles_primordial',
}

export const elementalWardingEleResto: Ability = {
  ...elementalWardingEnh,
  dr: 0.04,
}

export const brimmingWithLife: Ability = {
  name: 'Brimming With Life',
  healthIncrease: 0.08,
  onByDefault: true,
  spellId: 381689,
  wowheadLink: 'https://www.wowhead.com/spell=381689/brimming-with-life',
  iconName: 'inv_jewelry_talisman_06',
}

export const ancestralDefense: Ability = {
  name: 'Ancestral Defense',
  avoidance: 0.02,
  onByDefault: true,
  spellId: 382947,
  wowheadLink: 'https://www.wowhead.com/spell=382947/ancestral-defense',
  iconName: 'ability_earthen_pillar',
}

export const astralShift: Ability = {
  name: 'Astral Shift',
  dr: 0.4,
  spellId: 108271,
  wowheadLink: 'https://www.wowhead.com/spell=108271/astral-shift',
  iconName: 'ability_shaman_astralshift',
}

export const earthElemental: Ability = {
  name: 'Earth Elemental',
  healthIncrease: 0.15,
  spellId: 198103,
  wowheadLink: 'https://www.wowhead.com/spell=198103/earth-elemental',
  iconName: 'spell_nature_earthelemental_totem',
}

export const shamanEnhAbilities = [
  elementalWardingEnh,
  brimmingWithLife,
  ancestralDefense,
  astralShift,
  earthElemental,
]

export const shamanEleRestoAbilities = [
  elementalWardingEleResto,
  brimmingWithLife,
  ancestralDefense,
  astralShift,
  earthElemental,
]
