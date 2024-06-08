import type { Ability } from '../ability'

const spellWarding: Ability = {
  name: 'Spell Warding',
  onByDefault: true,
  dr: 0.03,
  drType: 'magic',
  spellId: 390667,
  icon: 'spell_holy_spellwarding',
}

const protectiveLight: Ability = {
  name: 'Protective Light',
  dr: 0.1,
  spellId: 193063,
  icon: 'spell_holy_holyprotection',
}

const fade: Ability = {
  name: 'Fade',
  dr: 0.1,
  spellId: 586,
  icon: 'spell_magic_lesserinvisibilty',
}

const powerWordShield: Ability = {
  name: 'Power Word: Shield',
  spellId: 17,
  icon: 'spell_holy_powerwordshield',
  absorb: {
    spMultipler: 3.36,
    versAffected: true,
  },
}

const powerWordShieldShadow: Ability = {
  ...powerWordShield,
  spellId: 17_1,
  absorb: {
    ...powerWordShield.absorb,
    spMultipler: powerWordShield.absorb!.spMultipler! * 1.25,
  },
}

const powerWordShieldDisc: Ability = {
  ...powerWordShield,
  spellId: 17_2,
  absorb: {
    ...powerWordShield.absorb,
    spMultipler: powerWordShield.absorb!.spMultipler! * 1.37,
  },
}

const aegisOfWrath: Ability = {
  name: 'Aegis of Wrath',
  spellId: 238135,
  icon: 'spell_holy_powerwordshield',
  abilityAugmentations: [
    {
      otherSpellId: powerWordShieldDisc.spellId,
      field: 'absorb',
      absorbField: 'spMultipler',
      value: 0.3,
    },
  ],
}

const desperatePrayer: Ability = {
  name: 'Desperate Prayer',
  healthIncrease: 0.25,
  spellId: 19236,
  icon: 'spell_holy_testoffaith',
}

const lightsInspiration: Ability = {
  name: "Light's Inspiration",
  spellId: 373450,
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
  spellId: 377065,
  absorb: {
    healthMultiplier: 0.1,
  },
  icon: 'ability_priest_clarityofpower',
}

const dispersion: Ability = {
  name: 'Dispersion',
  dr: 0.75,
  spellId: 47585,
  icon: 'spell_shadow_dispersion',
}

export const priestDiscAbilities = [
  lightsInspiration,
  aegisOfWrath,
  spellWarding,
  protectiveLight,
  fade,
  powerWordShieldDisc,
  desperatePrayer,
]

export const priestHolyAbilities = [
  spellWarding,
  protectiveLight,
  fade,
  powerWordShield,
  desperatePrayer,
  lightsInspiration,
]

export const priestShadowAbilities = [
  spellWarding,
  protectiveLight,
  fade,
  powerWordShieldShadow,
  desperatePrayer,
  lightsInspiration,
  mentalFortitude,
  dispersion,
]
