import type { Ability } from '../ability'

const spellWarding: Ability = {
  name: 'Spell Warding',
  onByDefault: true,
  dr: 0.03,
  drType: 'magic',
  id: 390667,
  passive: true,
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

const powerWordShield: Ability = {
  name: 'Power Word: Shield',
  id: 17,
  icon: 'spell_holy_powerwordshield',
  absorb: {
    spMultipler: 4.032,
    versAffected: true,
  },
}

const powerWordShieldShadow: Ability = {
  ...powerWordShield,
  id: 17_1,
  absorb: {
    ...powerWordShield.absorb,
    spMultipler: powerWordShield.absorb!.spMultipler!,
  },
}

const powerWordShieldDisc: Ability = {
  ...powerWordShield,
  id: 17_2,
  absorb: {
    ...powerWordShield.absorb,
    spMultipler: powerWordShield.absorb!.spMultipler! * 1.73,
  },
}

const eternalBarrier: Ability = {
  name: 'Aegis of Wrath',
  id: 238135,
  passive: true,
  icon: 'spell_holy_powerwordshield',
  abilityAugmentations: [
    {
      otherAbilityId: powerWordShieldDisc.id,
      field: 'absorb',
      absorbField: 'spMultipler',
      value: 0.2,
    },
  ],
}

const preventiveMeasures: Ability = {
  name: 'Preventive Measures',
  id: 440662,
  passive: true,
  icon: 'spell_holy_powerwordshield',
  heroTree: 'Oracle',
  abilityAugmentations: [
    {
      otherAbilityId: powerWordShieldDisc.id,
      field: 'absorb',
      absorbField: 'spMultipler',
      value: 0.4,
    },
  ],
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
  passive: true,
  icon: 'spell_holy_restoration',
  abilityAugmentations: [
    {
      otherAbilityId: 19236, // Desperate Prayer
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

const embraceTheShadow: Ability = {
  name: 'Embrace the Shadow',
  id: 451569,
  passive: true,
  dr: 0.03,
  drType: 'magic',
  icon: 'warlock_curse_shadow_aura',
  heroTree: 'Voidweaver',
}

const wordOfSupremacy: Ability = {
  name: 'Word of Supremacy',
  id: 453726,
  passive: true,
  icon: 'spell_holy_wordfortitude',
  heroTree: 'Archon',
  staminaIncrease: 0.05,
}

const innerQuietus: Ability = {
  name: 'Inner Quietus',
  id: 448278,
  passive: true,
  icon: 'inv_cosmicvoid_buff',
  heroTree: 'Voidweaver',
  abilityAugmentations: [
    {
      otherAbilityId: powerWordShieldDisc.id,
      field: 'absorb',
      absorbField: 'spMultipler',
      value: 0.2,
    },
  ],
}

export const priestDiscAbilities = [
  lightsInspiration,
  eternalBarrier,
  preventiveMeasures,
  innerQuietus,
  spellWarding,
  embraceTheShadow,
  protectiveLight,
  fade,
  powerWordShieldDisc,
  desperatePrayer,
]

export const priestHolyAbilities = [
  spellWarding,
  wordOfSupremacy,
  protectiveLight,
  fade,
  powerWordShield,
  desperatePrayer,
  lightsInspiration,
]

export const priestShadowAbilities = [
  spellWarding,
  embraceTheShadow,
  wordOfSupremacy,
  protectiveLight,
  fade,
  powerWordShieldShadow,
  desperatePrayer,
  lightsInspiration,
  mentalFortitude,
  dispersion,
]
