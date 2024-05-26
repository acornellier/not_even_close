import type { Ability, AbilityAugmentation } from '../ability'

const arcaneWarding: Ability = {
  name: 'Arcane Warding',
  dr: 0.02,
  drType: 'magic',
  stacks: { type: 'talent', max: 2 },
  onByDefault: true,
  spellId: 383092,
  iconName: 'spell_arcane_arcaneresilience',
}

const blazingBarrier: Ability = {
  name: 'Blazing Barrier',
  absorb: {
    healthMultiplier: 0.2,
    versAffected: true,
  },
  spellId: 382791,
  iconName: 'ability_mage_moltenarmor',
}

const iceBarrier: Ability = {
  name: 'Ice Barrier',
  absorb: {
    healthMultiplier: 0.22,
    versAffected: true,
  },
  spellId: 11426,
  iconName: 'spell_ice_lament',
}

export const prismaticBarrier: Ability = {
  name: 'Prismatic Barrier',
  absorb: {
    healthMultiplier: 0.2,
    versAffected: true,
  },
  dr: 0.15,
  drType: 'magic',
  spellId: 235450,
  iconName: 'spell_magearmor',
}

export const improvedPrismaticBarrierAugmentation: AbilityAugmentation = {
  otherSpellId: 235450,
  field: 'dr',
  value: 0.1,
}

export const improvedPrismaticBarrier: Ability = {
  name: 'Improved Prismatic Barrier',
  spellId: 321745,
  iconName: 'spell_magearmor',
  abilityAugmentations: [improvedPrismaticBarrierAugmentation],
}

const tempestBarrier: Ability = {
  name: 'Tempest Barrier',
  spellId: 382289,
  absorb: {
    healthMultiplier: 0.03,
    versAffected: true,
  },
  stacks: { type: 'talent', max: 2 },
  iconName: 'inv_shield_1h_artifactstormfist_d_04',
}

const iceCold: Ability = {
  name: 'Ice Cold',
  dr: 0.7,
  spellId: 414658,
  iconName: 'spell_fire_bluefire',
}

const mirrorImage: Ability = {
  name: 'Mirror Image',
  dr: 0.2,
  spellId: 55342,
  iconName: 'spell_magic_lesserinvisibilty',
}

const greaterInvisibility: Ability = {
  name: 'Greater Invisibility',
  dr: 0.6,
  spellId: 110959,
  iconName: 'ability_mage_greaterinvisibility',
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
