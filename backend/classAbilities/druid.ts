import { Ability } from '../ability'

export const thickHide: Ability = {
  name: 'Thick Hide',
  dr: 0.06,
  onByDefault: true,
  spellId: 16931,
  iconName: 'inv_misc_pelt_bear_03',
}

export const risingLight: Ability = {
  name: 'Rising Light, Falling Night',
  versIncrease: 0.02,
  spellId: 417712,
  iconName: 'spell_druid_equinox',
}

export const bearForm: Ability = {
  name: 'Bear Form',
  staminaIncrease: 0.25,
  versIncrease: 0.06,
  spellId: 5487,
  iconName: 'ability_racial_bearform',
  notes: "Assumes you have 3 points in Lycara's Teachings",
}

export const ursineVigorOnePoint: Ability = {
  name: 'Ursine Vigor (1 point)',
  talentPoints: 1,
  spellId: 377842_1,
  iconName: 'ability_druid_markofursol',
  notes: 'Do NOT select both ursine vigors',
  abilityAugmentations: [
    {
      otherSpellId: 5487,
      field: 'healthIncrease',
      value: 0.1,
    },
  ],
}

export const ursineVigorTwoPoints: Ability = {
  name: 'Ursine Vigor (2 points)',
  talentPoints: 2,
  spellId: 377842_2,
  iconName: 'ability_druid_markofursol',
  notes: 'Do NOT select both ursine vigors',
  abilityAugmentations: [
    {
      otherSpellId: 5487,
      field: 'healthIncrease',
      value: 0.2,
    },
  ],
}

export const heartOfTheWild: Ability = {
  name: 'Heart of the Wild',
  spellId: 319454,
  iconName: 'spell_holy_blessingofagility',
  abilityAugmentations: [
    {
      otherSpellId: 5487,
      field: 'staminaIncrease',
      value: 0.2,
    },
  ],
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

export const protectiveGrowth: Ability = {
  name: 'Protective Growth',
  dr: 0.05,
  spellId: 391947,
  iconName: 'spell_nature_resistnature',
}

export const innerPeace: Ability = {
  name: 'Inner Peace (Tranq)',
  dr: 0.2,
  spellId: 197073,
  iconName: 'ability_druid_dreamstate',
}

export const druidBalanceAbilities = [
  thickHide,
  risingLight,
  bearForm,
  ursineVigorOnePoint,
  ursineVigorTwoPoints,
  heartOfTheWild,
  barkskin,
]

export const druidFeralAbilities = [
  thickHide,
  risingLight,
  bearForm,
  ursineVigorOnePoint,
  ursineVigorTwoPoints,
  heartOfTheWild,
  barkskin,
  survivalInsticts,
  protectiveGrowth,
]

export const druidRestoAbilities = [
  thickHide,
  risingLight,
  bearForm,
  ursineVigorOnePoint,
  ursineVigorTwoPoints,
  heartOfTheWild,
  barkskin,
  innerPeace,
]
