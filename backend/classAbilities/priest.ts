import { Ability } from '../ability'

export const protectiveLight: Ability = {
  name: 'Protective Light',
  dr: 0.1,
  spellId: 193063,
  iconName: 'spell_holy_holyprotection',
}

export const fade: Ability = {
  name: 'Fade',
  dr: 0.1,
  spellId: 586,
  iconName: 'spell_magic_lesserinvisibilty',
}

export const desperatePrayer: Ability = {
  name: 'Desperate Prayer',
  healthIncrease: 0.25,
  spellId: 19236,
  iconName: 'spell_holy_testoffaith',
}

export const lightsInspiration: Ability = {
  name: "Light's Inspiration",
  healthIncrease: 0.08,
  spellId: 373450,
  iconName: 'spell_holy_restoration',
}

export const mentalFortitude: Ability = {
  name: 'Mental Fortitude',
  healthIncrease: 0.1,
  spellId: 377065,
  iconName: 'ability_priest_clarityofpower',
}

export const dispersion: Ability = {
  name: 'Dispersion',
  dr: 0.75,
  spellId: 47585,
  iconName: 'spell_shadow_dispersion',
}

export const priestAbilities = [
  protectiveLight,
  fade,
  desperatePrayer,
  lightsInspiration,
  mentalFortitude,
  dispersion,
]
