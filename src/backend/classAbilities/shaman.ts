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
  healthIncrease: 0.05,
  onByDefault: true,
  id: 381689,
  passive: true,
  icon: 'inv_jewelry_talisman_06',
  stacks: {
    type: 'talent',
    max: 2,
  },
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
  healthIncrease: 0.15,
  icon: 'inv_elemental_primal_earth',
}

const naturesProtection: Ability = {
  name: "Nature's Protection",
  id: 454029,
  icon: 'spell_nature_lightningshield',
  heroTree: 'Stormbringer',
  damageDealtReduction: 0.03,
}

const windveil: Ability = {
  name: 'Windviel',
  id: 355630,
  icon: 'inv_elemental_primal_air',
  dr: 0.15,
  drType: 'magic',
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

export const shamanEnhAbilities = [
  elementalWarding,
  brimmingWithLife,
  astralBulwark,
  windveil,
  naturesProtection,
  windBarrier,
  primordialBond,
  spiritWolf,
  astralShift,
]

export const shamanEleAbilities = [
  elementalWarding,
  brimmingWithLife,
  windveil,
  naturesProtection,
  astralBulwark,
  primordialBond,
  spiritWolf,
  astralShift,
]

export const shamanRestoAbilities = [
  elementalWarding,
  brimmingWithLife,
  windveil,
  windBarrier,
  astralBulwark,
  primordialBond,
  spiritWolf,
  astralShift,
]
