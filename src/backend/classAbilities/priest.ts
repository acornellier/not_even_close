import { Ability } from '../ability'

const spellWarding: Ability = {
  name: 'Spell Warding',
  onByDefault: true,
  dr: 0.03,
  drType: 'magic',
  spellId: 390667,
  iconName: 'spell_holy_spellwarding',
}

const protectiveLight: Ability = {
  name: 'Protective Light',
  dr: 0.1,
  spellId: 193063,
  iconName: 'spell_holy_holyprotection',
}

const fade: Ability = {
  name: 'Fade',
  dr: 0.1,
  spellId: 586,
  iconName: 'spell_magic_lesserinvisibilty',
}

const desperatePrayer: Ability = {
  name: 'Desperate Prayer',
  healthIncrease: 0.25,
  spellId: 19236,
  iconName: 'spell_holy_testoffaith',
}

const lightsInspiration: Ability = {
  name: "Light's Inspiration",
  spellId: 373450,
  iconName: 'spell_holy_restoration',
  abilityAugmentations: [
    {
      otherSpellId: 19236, // Desperate Prayer
      field: 'healthIncrease',
      value: 0.15,
    },
  ],
}

const mentalFortitude: Ability = {
  name: 'Mental Fortitude',
  spellId: 377065,
  absorb: {
    healthMultiplier: 0.1,
  },
  iconName: 'ability_priest_clarityofpower',
}

const dispersion: Ability = {
  name: 'Dispersion',
  dr: 0.75,
  spellId: 47585,
  iconName: 'spell_shadow_dispersion',
}

export const priestDiscAbilities = [
  spellWarding,
  protectiveLight,
  fade,
  desperatePrayer,
  lightsInspiration,
]

export const priestHolyAbilities = [
  spellWarding,
  protectiveLight,
  fade,
  desperatePrayer,
  lightsInspiration,
]

export const priestShadowAbilities = [
  spellWarding,
  protectiveLight,
  fade,
  desperatePrayer,
  lightsInspiration,
  mentalFortitude,
  dispersion,
]
