import type { Ability, AbilityAugmentation } from '../ability'

const arcaneWarding: Ability = {
  name: 'Arcane Warding',
  dr: 0.02,
  drType: 'magic',
  stacks: { type: 'talent', max: 2 },
  onByDefault: true,
  id: 383092,
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
    healthMultiplier: 0.22,
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
  dr: 0.15,
  drType: 'magic',
  id: 235450,
  icon: 'spell_magearmor',
}

export const improvedPrismaticBarrierAugmentation: AbilityAugmentation = {
  otherAbilityId: 235450,
  field: 'dr',
  value: 0.1,
}

export const improvedPrismaticBarrier: Ability = {
  name: 'Improved Prismatic Barrier',
  id: 321745,
  icon: 'spell_magearmor',
  abilityAugmentations: [improvedPrismaticBarrierAugmentation],
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

export const mageArcaneAbilities = [
  arcaneWarding,
  prismaticBarrier,
  improvedPrismaticBarrier,
  tempestBarrier,
  mirrorImage,
  greaterInvisibility,
  iceCold,
]

export const mageFireAbilities = [
  arcaneWarding,
  blazingBarrier,
  tempestBarrier,
  mirrorImage,
  greaterInvisibility,
  iceCold,
]

export const mageFrostAbilities = [
  arcaneWarding,
  iceBarrier,
  tempestBarrier,
  mirrorImage,
  greaterInvisibility,
  iceCold,
]
