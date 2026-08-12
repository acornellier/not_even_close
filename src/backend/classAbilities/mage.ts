import type { Ability } from '../ability'

const arcaneWarding: Ability = {
  name: 'Arcane Warding',
  dr: 0.02,
  drType: 'magic',
  stacks: { type: 'talent', max: 2 },
  onByDefault: true,
  id: 383092,
  passive: true,
  icon: 'spell_arcane_arcaneresilience',
}

const blazingBarrier: Ability = {
  name: 'Blazing Barrier',
  absorb: {
    healthMultiplier: 0.25,
    versAffected: true,
  },
  id: 382791,
  icon: 'ability_mage_moltenarmor',
}

const iceBarrier: Ability = {
  name: 'Ice Barrier',
  absorb: {
    healthMultiplier: 0.25,
    versAffected: true,
  },
  id: 11426,
  icon: 'spell_ice_lament',
  drType: 'physical',
}

const improvedIceBarrier: Ability = {
  name: 'Improved Ice Barrier',
  id: 1244069,
  icon: 'spell_ice_lament',
  passive: true,
  abilityAugmentations: [
    {
      otherAbilityId: iceBarrier.id,
      field: 'dr',
      value: 0.1,
    },
  ],
}

export const prismaticBarrier: Ability = {
  name: 'Prismatic Barrier',
  absorb: {
    healthMultiplier: 0.25,
    versAffected: true,
  },
  dr: 0.15,
  drType: 'magic',
  id: 235450,
  icon: 'spell_magearmor',
}

const improvedPrismaticBarrier: Ability = {
  name: 'Improved Prismatic Barrier',
  id: 321745,
  icon: 'spell_magearmor',
  passive: true,
  abilityAugmentations: [
    {
      otherAbilityId: prismaticBarrier.id,
      field: 'dr',
      value: 0.05,
    },
  ],
}

const improvedWarding: Ability = {
  name: 'Improved Warding',
  id: 1297073,
  icon: 'inv_cloth_raidmage_p_01helm',
  passive: true,
  onByDefault: true,
  aoeDr: 0.04,
}

const refractiveImages: Ability = {
  name: 'Refractive Images',
  id: 1309497,
  icon: 'inv_112_arcane_buff',
  passive: true,
  dr: 0.1,
  notes: 'Damage is delayed over 8s, not prevented. 30% for 15s after Mirror Image',
}

const iceCold: Ability = {
  name: 'Ice Cold',
  dr: 0.7,
  id: 414658,
  icon: 'spell_fire_bluefire',
}

const imbuedWarding: Ability = {
  name: 'Imbued Warding',
  id: 431066,
  passive: true,
  icon: 'inv_10_jewelcrafting_gem3primal_fire_cut_blue',
  heroTree: 'Frostfire',
  abilityAugmentations: [
    {
      otherAbilityId: blazingBarrier.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.25,
    },
    {
      otherAbilityId: iceBarrier.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.25,
    },
  ],
}

export const mageArcaneAbilities = [
  arcaneWarding,
  improvedWarding,
  refractiveImages,
  prismaticBarrier,
  improvedPrismaticBarrier,
  iceCold,
]

export const mageFireAbilities = [
  arcaneWarding,
  improvedWarding,
  blazingBarrier,
  imbuedWarding,
  iceCold,
]

export const mageFrostAbilities = [
  arcaneWarding,
  improvedWarding,
  iceBarrier,
  improvedIceBarrier,
  imbuedWarding,
  iceCold,
]
