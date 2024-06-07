import type { Ability } from '../ability'

const spellWarding: Ability = {
  name: 'Spell Warding',
  onByDefault: true,
  dr: 0.03,
  drType: 'magic',
  id: 390667,
  icon: 'spell_holy_spellwarding',
}

const protectiveLight: Ability = {
  name: 'Protective Light',
  dr: 0.1,
  id: 193063,
  icon: 'spell_holy_holyprotection',
}

const fade: Ability = {
  name: 'Fade',
  dr: 0.1,
  id: 586,
  icon: 'spell_magic_lesserinvisibilty',
}

const desperatePrayer: Ability = {
  name: 'Desperate Prayer',
  healthIncrease: 0.25,
  id: 19236,
  icon: 'spell_holy_testoffaith',
}

const lightsInspiration: Ability = {
  name: "Light's Inspiration",
  id: 373450,
  icon: 'spell_holy_restoration',
  abilityAugmentations: [
    {
      otherSpellId: 19236, // Desperate Prayer
      field: 'healthIncrease',
      value: 0.15,
    },
  ],
  stacks: {
    type: 'talent',
    max: 2,
    values: [0.08, 0.15],
  },
}

const mentalFortitude: Ability = {
  name: 'Mental Fortitude',
  id: 377065,
  absorb: {
    healthMultiplier: 0.1,
  },
  icon: 'ability_priest_clarityofpower',
}

const dispersion: Ability = {
  name: 'Dispersion',
  dr: 0.75,
  id: 47585,
  icon: 'spell_shadow_dispersion',
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
