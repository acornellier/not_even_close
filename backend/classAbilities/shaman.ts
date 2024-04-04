import { Ability } from '../ability'

const elementalWardingEnh: Ability = {
  name: 'Elemental Warding',
  dr: 0.06,
  drType: 'magic',
  onByDefault: true,
  spellId: 381650,
  wowheadLink: 'https://www.wowhead.com/spell=381650/elemental-warding',
  iconName: 'inv_10_elementalcombinedfoozles_primordial',
}

const elementalWardingEleResto: Ability = {
  ...elementalWardingEnh,
  dr: 0.04,
}

const brimmingWithLife: Ability = {
  name: 'Brimming With Life',
  healthIncrease: 0.08,
  onByDefault: true,
  spellId: 381689,
  wowheadLink: 'https://www.wowhead.com/spell=381689/brimming-with-life',
  iconName: 'inv_jewelry_talisman_06',
}

const ancestralDefense: Ability = {
  name: 'Ancestral Defense',
  aoeDr: 0.02,
  onByDefault: true,
  spellId: 382947,
  wowheadLink: 'https://www.wowhead.com/spell=382947/ancestral-defense',
  iconName: 'ability_earthen_pillar',
}

const astralShift: Ability = {
  name: 'Astral Shift',
  dr: 0.4,
  spellId: 108271,
  wowheadLink: 'https://www.wowhead.com/spell=108271/astral-shift',
  iconName: 'ability_shaman_astralshift',
}

const astralBulwark: Ability = {
  name: 'Astral Bulwark',
  spellId: 377933,
  onByDefault: false,
  iconName: 'spell_shaman_ancestralawakening',
  abilityAugmentations: [
    {
      otherSpellId: 108271,
      field: 'dr',
      value: 0.2,
    },
  ],
}

const earthElemental: Ability = {
  name: 'Earth Elemental',
  healthIncrease: 0.15,
  spellId: 198103,
  wowheadLink: 'https://www.wowhead.com/spell=198103/earth-elemental',
  iconName: 'spell_nature_earthelemental_totem',
}

const spiritWolf: Ability = {
  name: 'Spirit Wolf',
  dr: 0.2,
  spellId: 260878,
  iconName: 'spell_hunter_lonewolf',
}

const primordialBond: Ability = {
  name: 'Primordial Bond',
  spellId: 381764,
  dr: 0.05,
  iconName: 'inv_elemental_primal_earth',
}

export const shamanEnhAbilities = [
  elementalWardingEnh,
  brimmingWithLife,
  ancestralDefense,
  astralBulwark,
  earthElemental,
  spiritWolf,
  astralShift,
]

export const shamanEleAbilities = [
  elementalWardingEleResto,
  brimmingWithLife,
  ancestralDefense,
  astralBulwark,
  earthElemental,
  primordialBond,
  spiritWolf,
  astralShift,
]

export const shamanRestoAbilities = [
  elementalWardingEleResto,
  brimmingWithLife,
  ancestralDefense,
  astralBulwark,
  earthElemental,
  spiritWolf,
  astralShift,
]
