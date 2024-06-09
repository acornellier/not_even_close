import type { Ability } from '../ability'

const thickHide: Ability = {
  name: 'Thick Hide',
  dr: 0.03,
  onByDefault: true,
  spellId: 16931,
  icon: 'inv_misc_pelt_bear_03',
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const risingLight: Ability = {
  name: 'Rising Light, Falling Night',
  versIncrease: 0.02,
  spellId: 417712,
  icon: 'spell_druid_equinox',
}

const bearForm: Ability = {
  name: 'Bear Form',
  staminaIncrease: 0.25,
  spellId: 5487,
  icon: 'ability_racial_bearform',
}

export const ursineVigorPassive: Ability = {
  name: 'Ursine Vigor (passive)',
  spellId: 377842,
  stacks: {
    type: 'talent',
    max: 2,
  },
  icon: 'ability_druid_markofursol',
  abilityAugmentations: [
    {
      otherSpellId: bearForm.spellId,
      field: 'healthIncrease',
      value: 0.1,
    },
  ],
}

export const ursineVigorActive: Ability = {
  name: 'Ursine Vigor (active)',
  spellId: 377842_1,
  stacks: {
    type: 'talent',
    max: 2,
  },
  icon: 'ability_druid_markofursol',
  healthIncrease: 0.1,
  replacedBy: ursineVigorPassive.spellId,
}

ursineVigorPassive.replacedBy = ursineVigorActive.spellId

const heartOfTheWild: Ability = {
  name: 'Heart of the Wild',
  spellId: 319454,
  icon: 'spell_holy_blessingofagility',
  abilityAugmentations: [
    {
      otherSpellId: bearForm.spellId,
      field: 'staminaIncrease',
      value: 0.2,
    },
  ],
}

export const barkskin: Ability = {
  name: 'Barkskin',
  dr: 0.2,
  spellId: 22812,
  absorb: {
    versAffected: true,
  },
  icon: 'spell_nature_stoneclawtotem',
  notes:
    'The Matted Fur absorb is exact for Balance and Resto, but slightly off for Feral and Guardian due to weapon dps missing.',
}

const mattedFur: Ability = {
  name: 'Matted Fur',
  spellId: 385786,
  onByDefault: true,
  abilityAugmentations: [
    {
      otherSpellId: barkskin.spellId,
      field: 'absorb',
      absorbField: 'apMultipler',
      value: 3.125,
    },
  ],
  icon: 'inv_misc_pelt_15',
}

const survivalInsticts: Ability = {
  name: 'Survival Instincts',
  dr: 0.5,
  spellId: 61336,
  icon: 'ability_druid_tigersroar',
}

const protectiveGrowth: Ability = {
  name: 'Protective Growth',
  dr: 0.05,
  spellId: 391947,
  icon: 'spell_nature_resistnature',
}

const innerPeace: Ability = {
  name: 'Inner Peace (Tranq)',
  dr: 0.2,
  spellId: 197073,
  icon: 'ability_druid_dreamstate',
}

export const druidBalanceAbilities = [
  mattedFur,
  thickHide,
  risingLight,
  heartOfTheWild,
  ursineVigorPassive,
  bearForm,
  barkskin,
]

export const druidFeralAbilities = [
  mattedFur,
  thickHide,
  protectiveGrowth,
  risingLight,
  heartOfTheWild,
  ursineVigorPassive,
  bearForm,
  barkskin,
  survivalInsticts,
]

export const druidRestoAbilities = [
  mattedFur,
  risingLight,
  thickHide,
  heartOfTheWild,
  ursineVigorPassive,
  bearForm,
  barkskin,
  innerPeace,
]
