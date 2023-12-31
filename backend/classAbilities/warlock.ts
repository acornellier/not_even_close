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
}

export const soulLeech: Ability = {
  name: 'Soul Leech',
  absorbHealthMultiplier: 0.15,
  spellId: 108370,
  iconName: 'warlock_siphonlife',
}

export const darkPact: Ability = {
  name: 'Dark Pact',
  absorbHealthMultiplier: 0.6,
  spellId: 108416,
  iconName: 'spell_shadow_deathpact',
  notes:
    'HACK. Actually 20% HP + 2.5 * spell power, but spell power is not implemented. This estimate is reasonably close with current numbers',
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

export const warlockAbilities = [
  felArmor,
  demonicFortitude,
  soulLink,
  soulLeech,
  darkPact,
  unendingResolve,
  strengthOfWill,
]
