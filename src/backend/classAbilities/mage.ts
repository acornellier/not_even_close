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
    healthMultiplier: 0.2,
    versAffected: true,
  },
  id: 382791,
  icon: 'ability_mage_moltenarmor',
}

const iceBarrier: Ability = {
  name: 'Ice Barrier',
  absorb: {
    healthMultiplier: 0.24,
    versAffected: true,
  },
  id: 11426,
  icon: 'spell_ice_lament',
}

export const prismaticBarrier: Ability = {
  name: 'Prismatic Barrier',
  absorb: {
    healthMultiplier: 0.2,
    versAffected: true,
  },
  dr: 0.25,
  drType: 'magic',
  id: 235450,
  icon: 'spell_magearmor',
}

const tempestBarrier: Ability = {
  name: 'Tempest Barrier',
  id: 382289,
  absorb: {
    healthMultiplier: 0.03,
    versAffected: true,
  },
  stacks: { type: 'talent', max: 2 },
  icon: 'inv_shield_1h_artifactstormfist_d_04',
}

const iceCold: Ability = {
  name: 'Ice Cold',
  dr: 0.7,
  id: 414658,
  icon: 'spell_fire_bluefire',
}

const mirrorImage: Ability = {
  name: 'Mirror Image',
  dr: 0.2,
  id: 55342,
  icon: 'spell_magic_lesserinvisibilty',
}

const greaterInvisibility: Ability = {
  name: 'Greater Invisibility',
  dr: 0.6,
  id: 110959,
  icon: 'ability_mage_greaterinvisibility',
}

const phantasmalImage: Ability = {
  name: 'Phantasmal Image',
  id: 444784,
  passive: true,
  icon: 'spell_arcane_prismaticcloak',
  heroTree: 'Spellslinger',
  abilityAugmentations: [
    {
      otherAbilityId: mirrorImage.id,
      field: 'dr',
      value: 0.05,
    },
  ],
}

const merelyASetback: Ability = {
  name: 'Merely a Setback',
  id: 449330,
  passive: true,
  icon: 'inv_helm_robe_raidmage_i_01',
  heroTree: 'Sunfury',
  abilityAugmentations: [
    {
      otherAbilityId: prismaticBarrier.id,
      field: 'aoeDr',
      value: 0.05,
    },
    {
      otherAbilityId: blazingBarrier.id,
      field: 'aoeDr',
      value: 0.05,
    },
  ],
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
  prismaticBarrier,
  merelyASetback,
  tempestBarrier,
  mirrorImage,
  phantasmalImage,
  greaterInvisibility,
  iceCold,
]

export const mageFireAbilities = [
  arcaneWarding,
  blazingBarrier,
  merelyASetback,
  imbuedWarding,
  tempestBarrier,
  mirrorImage,
  greaterInvisibility,
  iceCold,
]

export const mageFrostAbilities = [
  arcaneWarding,
  iceBarrier,
  imbuedWarding,
  tempestBarrier,
  mirrorImage,
  phantasmalImage,
  greaterInvisibility,
  iceCold,
]
