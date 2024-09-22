import type { Ability } from '../ability'

const elementalWarding: Ability = {
  name: 'Elemental Warding',
  id: 381650,
  passive: true,
  icon: 'inv_10_elementalcombinedfoozles_primordial',
  dr: 0.06,
  drType: 'magic',
  onByDefault: true,
}

const brimmingWithLife: Ability = {
  name: 'Brimming With Life',
  healthIncrease: 0.1,
  onByDefault: true,
  id: 381689,
  passive: true,
  icon: 'inv_jewelry_talisman_06',
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
  passive: true,
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
  id: 381764_1,
  dr: 0.05,
  icon: 'inv_elemental_primal_earth',
}

const primordialBondPassive: Ability = {
  name: 'Primordial Bond',
  id: 381764,
  passive: true,
  icon: 'inv_elemental_primal_earth',
  abilityAugmentations: [
    {
      otherAbilityId: earthElemental.id,
      field: 'dr',
      value: 0.05,
    },
  ],
}

const naturesProtection: Ability = {
  name: "Nature's Protection",
  id: 454029,
  icon: 'spell_nature_lightningshield',
  heroTree: 'Stormbringer',
  damageDealtReduction: 0.1,
}

const seasonedWinds: Ability = {
  name: 'Seasoned Winds',
  id: 355630,
  icon: 'spell_nature_cyclone',
  dr: 0.15,
  drType: 'magic',
  stacks: { type: 'stacks', max: 2, default: 1 },
}

const windBarrier: Ability = {
  name: 'Wind Barrier',
  id: 445031,
  icon: 'spell_nature_eyeofthestorm',
  heroTree: 'Totemic',
  absorb: {
    healthMultiplier: 0.06,
  },
}

const stoneBulwark: Ability = {
  name: 'Stone Bulwark Totem',
  id: 108270,
  icon: 'ability_shaman_stonebulwark',
  absorb: {
    spMultipler: 36,
    versAffected: true,
  },
}

export const shamanEnhAbilities = [
  elementalWarding,
  brimmingWithLife,
  astralBulwark,
  seasonedWinds,
  naturesProtection,
  windBarrier,
  earthElemental,
  primordialBondPassive,
  spiritWolf,
  stoneBulwark,
  astralShift,
]

export const shamanEleAbilities = [
  elementalWarding,
  brimmingWithLife,
  seasonedWinds,
  naturesProtection,
  astralBulwark,
  earthElemental,
  primordialBond,
  spiritWolf,
  stoneBulwark,
  astralShift,
]

export const shamanRestoAbilities = [
  elementalWarding,
  brimmingWithLife,
  seasonedWinds,
  windBarrier,
  astralBulwark,
  earthElemental,
  primordialBondPassive,
  spiritWolf,
  stoneBulwark,
  astralShift,
]
