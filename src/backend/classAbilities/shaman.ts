import type { Ability } from '../ability'

const elementalWardingEnh: Ability = {
  name: 'Elemental Warding',
  dr: 0.03,
  drType: 'magic',
  stacks: { type: 'talent', max: 2 },
  onByDefault: true,
  id: 381650,
  icon: 'inv_10_elementalcombinedfoozles_primordial',
}

const elementalWardingEleResto: Ability = {
  ...elementalWardingEnh,
  id: elementalWardingEnh.id + 1,
  dr: 0.02,
}

const brimmingWithLife: Ability = {
  name: 'Brimming With Life',
  healthIncrease: 0.1,
  onByDefault: true,
  id: 381689_2,
  icon: 'inv_jewelry_talisman_06',
}

const ancestralDefense: Ability = {
  name: 'Ancestral Defense',
  aoeDr: 0.02,
  onByDefault: true,
  id: 382947,
  icon: 'ability_earthen_pillar',
}

const astralShift: Ability = {
  name: 'Astral Shift',
  dr: 0.4,
  id: 108271,
  icon: 'ability_shaman_astralshift',
}

const astralBulwark: Ability = {
  name: 'Astral Bulwark',
  id: 377933,
  onByDefault: false,
  icon: 'spell_shaman_ancestralawakening',
  abilityAugmentations: [
    {
      otherAbilityId: 108271,
      field: 'dr',
      value: 0.2,
    },
  ],
}

const earthElemental: Ability = {
  name: 'Earth Elemental',
  healthIncrease: 0.15,
  id: 198103,
  icon: 'spell_nature_earthelemental_totem',
}

const spiritWolf: Ability = {
  name: 'Spirit Wolf',
  dr: 0.05,
  stacks: { type: 'stacks', max: 4 },
  id: 260878,
  icon: 'spell_hunter_lonewolf',
}

const primordialBond: Ability = {
  name: 'Primordial Bond',
  id: 381764,
  dr: 0.05,
  icon: 'inv_elemental_primal_earth',
}

const naturesProtection: Ability = {
  name: "Nature's Protection",
  id: 454029,
  icon: 'spell_nature_lightningshield',
  heroTree: 'Stormbringer',
  damageDealtReduction: 0.1,
}

export const shamanEnhAbilities = [
  elementalWardingEnh,
  brimmingWithLife,
  ancestralDefense,
  astralBulwark,
  naturesProtection,
  earthElemental,
  spiritWolf,
  astralShift,
]

export const shamanEleAbilities = [
  elementalWardingEleResto,
  brimmingWithLife,
  ancestralDefense,
  naturesProtection,
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
