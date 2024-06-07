import type { Ability } from '../ability'

const thickHide: Ability = {
  name: 'Thick Hide',
  id: 16931,
  icon: 'inv_misc_pelt_bear_03',
  dr: 0.04,
  onByDefault: true,
}

const risingLight: Ability = {
  name: 'Rising Light, Falling Night',
  versIncrease: 0.02,
  id: 417712,
  icon: 'spell_druid_equinox',
}

const bearForm: Ability = {
  name: 'Bear Form',
  staminaIncrease: 0.25,
  id: 5487,
  icon: 'ability_racial_bearform',
}

const ursineVigor: Ability = {
  name: 'Ursine Vigor',
  id: 377842,
  icon: 'ability_druid_markofursol',
  abilityAugmentations: [
    {
      otherAbilityId: bearForm.id,
      field: 'healthIncrease',
      value: 0.15,
    },
    {
      otherAbilityId: bearForm.id,
      field: 'armorIncrease',
      value: 0.15,
    },
  ],
}

const heartOfTheWild: Ability = {
  name: 'Heart of the Wild',
  id: 319454,
  icon: 'spell_holy_blessingofagility',
  abilityAugmentations: [
    {
      otherAbilityId: bearForm.id,
      field: 'staminaIncrease',
      value: 0.2,
    },
  ],
}

export const barkskin: Ability = {
  name: 'Barkskin',
  dr: 0.2,
  id: 22812,
  absorb: {
    versAffected: true,
  },
  icon: 'spell_nature_stoneclawtotem',
  notes:
    'The Matted Fur absorb is exact for Balance and Resto, but slightly off for Feral and Guardian due to weapon dps missing.',
}

const mattedFur: Ability = {
  name: 'Matted Fur',
  id: 385786,
  onByDefault: true,
  abilityAugmentations: [
    {
      otherAbilityId: barkskin.id,
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
  id: 61336,
  icon: 'ability_druid_tigersroar',
}

const protectiveGrowth: Ability = {
  name: 'Protective Growth',
  dr: 0.05,
  id: 391947,
  icon: 'spell_nature_resistnature',
}

const innerPeace: Ability = {
  name: 'Inner Peace (Tranq)',
  dr: 0.2,
  id: 197073,
  icon: 'ability_druid_dreamstate',
}

const oakskin: Ability = {
  name: 'Oakskin',
  id: 449191,
  icon: 'spell_nature_stoneclawtotem',
  abilityAugmentations: [
    {
      otherAbilityId: barkskin.id,
      field: 'dr',
      value: 0.1,
    },
    {
      otherAbilityId: survivalInsticts.id,
      field: 'dr',
      value: 0.1,
    },
  ],
}

const ursocsSpirit: Ability = {
  name: "Ursoc's Spirit",
  id: 449182,
  icon: 'spell_nature_spiritarmor',
  abilityAugmentations: [
    {
      otherAbilityId: bearForm.id,
      field: 'staminaIncrease',
      value: 0.1,
    },
  ],
}

export const druidBalanceAbilities = [
  mattedFur,
  oakskin,
  ursocsSpirit,
  thickHide,
  heartOfTheWild,
  ursineVigor,
  risingLight,
  bearForm,
  barkskin,
]

export const druidFeralAbilities = [
  mattedFur,
  oakskin,
  ursocsSpirit,
  thickHide,
  protectiveGrowth,
  risingLight,
  bearForm,
  heartOfTheWild,
  ursineVigor,
  barkskin,
  survivalInsticts,
]

export const druidRestoAbilities = [
  mattedFur,
  oakskin,
  ursocsSpirit,
  thickHide,
  risingLight,
  bearForm,
  heartOfTheWild,
  ursineVigor,
  barkskin,
  innerPeace,
]
