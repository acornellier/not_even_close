import { Ability } from '../ability'

export const felArmor: Ability = {
  name: 'Fel Armor',
  dr: 0.03,
  onByDefault: true,
  spellId: 386124,
  iconName: 'spell_shadow_felarmour',
}

export const demonicFortitude: Ability = {
  name: 'Demonic Fortitude',
  healthIncrease: 0.05,
  onByDefault: true,
  spellId: 386617,
  iconName: 'spell_warlock_summonimpoutland',
}

export const soulLink: Ability = {
  name: 'Soul Link',
  dr: 0.1,
  onByDefault: true,
  spellId: 108415,
  iconName: 'ability_warlock_soullink',
  notes: 'Only while your pet is active',
}

const soulburn: Ability = {
  name: 'Soulburn + Healthstone',
  healthIncrease: 0.2,
  spellId: 385899,
  iconName: 'spell_warlock_soulburn',
}

const grimoireOfSacrifice: Ability = {
  name: 'Grimoire of Sacrifice',
  spellId: 108503,
  staminaIncrease: 0.05,
  iconName: 'warlock_grimoireofsacrifice',
  notes: 'Cannot have Soul Link while this is active',
}

export const abyssWalker: Ability = {
  name: 'Abyss Walker',
  spellId: 389609,
  dr: 0.04,
  iconName: 'achievement_explore_argus',
}

export const soulLeech: Ability = {
  name: 'Soul Leech',
  spellId: 108370,
  absorb: {
    healthMultiplier: 0.15,
  },
  iconName: 'warlock_siphonlife',
}

const shadowBulwark: Ability = {
  name: 'Shadow Bulwark',
  spellId: 17767,
  healthIncrease: 0.3,
  iconName: 'spell_shadow_antishadow',
}

export const darkPact: Ability = {
  name: 'Dark Pact',
  spellId: 108416,
  absorb: {
    healthMultiplier: 0.2,
    spMultipler: 2.5,
  },
  iconName: 'spell_shadow_deathpact',
}

export const unendingResolve: Ability = {
  name: 'Unending Resolve',
  dr: 0.25,
  spellId: 104773,
  iconName: 'spell_shadow_demonictactics',
}

export const strengthOfWill: Ability = {
  name: 'Strength of Will',
  spellId: 317138,
  onByDefault: true,
  iconName: 'spell_shadow_demonictactics',
  abilityAugmentations: [
    {
      otherSpellId: 104773,
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
  abyssWalker,
  soulLeech,
  soulburn,
  shadowBulwark,
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
