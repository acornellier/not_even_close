import type { Ability } from '../ability'

const thickHide: Ability = {
  name: 'Thick Hide',
  dr: 0.03,
  onByDefault: true,
  spellId: 16931,
  iconName: 'inv_misc_pelt_bear_03',
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const risingLight: Ability = {
  name: 'Rising Light, Falling Night',
  versIncrease: 0.02,
  spellId: 417712,
  iconName: 'spell_druid_equinox',
}

const bearForm: Ability = {
  name: 'Bear Form',
  staminaIncrease: 0.25,
  spellId: 5487,
  iconName: 'ability_racial_bearform',
}

const lycarasTeachings: Ability = {
  name: "Lycara's Teachings",
  onByDefault: false,
  spellId: 378988,
  iconName: 'inv_trinket_ardenweald_02_green',
  notes:
    'You might not receive the vers buff for up to 5 seconds after swapping to Bear Form',
  abilityAugmentations: [
    {
      otherSpellId: bearForm.spellId,
      field: 'versIncrease',
      value: 0.02,
    },
  ],
  stacks: {
    type: 'talent',
    max: 3,
  },
}

const ursineVigor: Ability = {
  name: 'Ursine Vigor',
  spellId: 377842,
  stacks: {
    type: 'talent',
    max: 2,
  },
  iconName: 'ability_druid_markofursol',
  abilityAugmentations: [
    {
      otherSpellId: bearForm.spellId,
      field: 'healthIncrease',
      value: 0.1,
    },
  ],
}

const heartOfTheWild: Ability = {
  name: 'Heart of the Wild',
  spellId: 319454,
  iconName: 'spell_holy_blessingofagility',
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
  iconName: 'spell_nature_stoneclawtotem',
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
  iconName: 'inv_misc_pelt_15',
}

const survivalInsticts: Ability = {
  name: 'Survival Instincts',
  dr: 0.5,
  spellId: 61336,
  iconName: 'ability_druid_tigersroar',
}

const protectiveGrowth: Ability = {
  name: 'Protective Growth',
  dr: 0.05,
  spellId: 391947,
  iconName: 'spell_nature_resistnature',
}

const innerPeace: Ability = {
  name: 'Inner Peace (Tranq)',
  dr: 0.2,
  spellId: 197073,
  iconName: 'ability_druid_dreamstate',
}

export const druidBalanceAbilities = [
  mattedFur,
  thickHide,
  risingLight,
  bearForm,
  heartOfTheWild,
  lycarasTeachings,
  ursineVigor,
  barkskin,
]

export const druidFeralAbilities = [
  mattedFur,
  thickHide,
  protectiveGrowth,
  risingLight,
  bearForm,
  heartOfTheWild,
  lycarasTeachings,
  ursineVigor,
  barkskin,
  survivalInsticts,
]

export const druidRestoAbilities = [
  mattedFur,
  risingLight,
  thickHide,
  bearForm,
  heartOfTheWild,
  lycarasTeachings,
  ursineVigor,
  barkskin,
  innerPeace,
]
