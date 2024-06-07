import type { Ability } from '../ability'

const felArmor: Ability = {
  name: 'Fel Armor',
  dr: 0.03,
  onByDefault: true,
  id: 386124,
  icon: 'spell_shadow_felarmour',
}

const demonicFortitude: Ability = {
  name: 'Demonic Fortitude',
  healthIncrease: 0.05,
  onByDefault: true,
  id: 386617,
  icon: 'spell_warlock_summonimpoutland',
}

const soulLink: Ability = {
  name: 'Soul Link',
  dr: 0.1,
  onByDefault: true,
  id: 108415,
  icon: 'ability_warlock_soullink',
  notes: 'Only while your pet is active',
}

const soulburn: Ability = {
  name: 'Soulburn + Healthstone',
  healthIncrease: 0.2,
  id: 385899,
  icon: 'spell_warlock_soulburn',
}

const grimoireOfSacrifice: Ability = {
  name: 'Grimoire of Sacrifice',
  id: 108503,
  staminaIncrease: 0.05,
  icon: 'warlock_grimoireofsacrifice',
  notes: 'Cannot have Soul Link while this is active',
}

const abyssWalker: Ability = {
  name: 'Abyss Walker',
  id: 389609,
  dr: 0.04,
  icon: 'achievement_explore_argus',
}

const soulLeech: Ability = {
  name: 'Soul Leech',
  id: 108370,
  absorb: {
    healthMultiplier: 0.15,
  },
  icon: 'warlock_siphonlife',
}

const shadowBulwark: Ability = {
  name: 'Shadow Bulwark',
  id: 17767,
  healthIncrease: 0.3,
  icon: 'spell_shadow_antishadow',
  notes:
    'If activating this, be sure to disable Soul Link and enable Grimoire of Sacrifice.',
}

const darkPact: Ability = {
  name: 'Dark Pact',
  id: 108416,
  absorb: {
    healthMultiplier: 0.4,
    versAffected: true,
    spMultipler: 2.5,
  },
  icon: 'spell_shadow_deathpact',
}

const unendingResolve: Ability = {
  name: 'Unending Resolve',
  dr: 0.25,
  id: 104773,
  icon: 'spell_shadow_demonictactics',
}

const strengthOfWill: Ability = {
  name: 'Strength of Will',
  id: 317138,
  onByDefault: true,
  icon: 'spell_shadow_demonictactics',
  abilityAugmentations: [
    {
      otherAbilityId: 104773,
      field: 'dr',
      value: 0.15,
    },
  ],
}

export const warlockAffDestroAbilities = [
  felArmor,
  demonicFortitude,
  soulLink,
  grimoireOfSacrifice,
  shadowBulwark,
  abyssWalker,
  soulLeech,
  soulburn,
  darkPact,
  unendingResolve,
  strengthOfWill,
]

export const warlockDemoAbilities = [
  felArmor,
  demonicFortitude,
  soulLink,
  abyssWalker,
  soulLeech,
  soulburn,
  darkPact,
  unendingResolve,
  strengthOfWill,
]
