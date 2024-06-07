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
  dr: 0.03,
  icon: 'warlock_curse_shadow_aura',
  heroTree: 'Voidweaver',
}

const wordOfSupremacy: Ability = {
  name: 'Word of Supremacy',
  id: 453726,
  icon: 'spell_holy_wordfortitude',
  heroTree: 'Archon',
  staminaIncrease: 0.05,
  notes:
    'If using this, make sure to have Power Word: Fortitude clicked off when checking your stamina, even when using the addon',
}

export const priestDiscAbilities = [
  spellWarding,
  embraceTheShadow,
  protectiveLight,
  fade,
  desperatePrayer,
  lightsInspiration,
]

export const priestHolyAbilities = [
  spellWarding,
  wordOfSupremacy,
  protectiveLight,
  fade,
  desperatePrayer,
  lightsInspiration,
]

export const priestShadowAbilities = [
  spellWarding,
  embraceTheShadow,
  wordOfSupremacy,
  protectiveLight,
  fade,
  desperatePrayer,
  lightsInspiration,
  mentalFortitude,
  dispersion,
]
