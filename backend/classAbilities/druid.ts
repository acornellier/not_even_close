import { Ability } from '../ability'

export const thickHide: Ability = {
  name: 'Thick Hide',
  dr: 0.06,
  onByDefault: true,
  spellId: 16931,
  iconName: 'inv_misc_pelt_bear_03',
}

export const bearForm: Ability = {
  name: 'Bear Form',
  staminaIncrease: 0.25,
  versIncrease: 0.06,
  spellId: 5487,
  iconName: 'ability_racial_bearform',
  notes: "Assumes you have 3 points in Lycara's Teachings",
}

export const ursineVigor: Ability = {
  name: 'Ursine Vigor',
  healthIncrease: 0.2,
  spellId: 377842,
  iconName: 'ability_druid_markofursol',
  notes: 'Assumes you already have bear form selected',
}

export const barkskin: Ability = {
  name: 'Barkskin',
  dr: 0.2,
  spellId: 22812,
  iconName: 'spell_nature_stoneclawtotem',
}

export const survivalInsticts: Ability = {
  name: 'Survival Instincts',
  dr: 0.5,
  spellId: 61336,
  iconName: 'ability_druid_tigersroar',
}

export const druidAbilities = [
  thickHide,
  bearForm,
  ursineVigor,
  barkskin,
  survivalInsticts,
]
