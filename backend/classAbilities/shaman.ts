import { Ability } from '../ability'

export const elementalWarding: Ability = {
  name: 'Elemental Warding',
  healthIncrease: 0.08,
  onByDefault: true,
  spellId: 381689,
  wowheadLink: 'https://www.wowhead.com/spell=381689/brimming-with-life',
  iconName: 'inv_jewelry_talisman_06',
}

export const brimmingWithLife: Ability = {
  name: 'Brimming With Life',
  dr: 0.06,
  onByDefault: true,
  spellId: 381650,
  wowheadLink: 'https://www.wowhead.com/spell=381650/elemental-warding',
  iconName: 'inv_10_elementalcombinedfoozles_primordial',
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

export const shamanAbilities = [
  elementalWarding,
  brimmingWithLife,
  ancestralDefense,
  astralShift,
  earthElemental,
]
