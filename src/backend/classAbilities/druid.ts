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
    'The Matted Fur absorb is exact for Balance and Resto, but slightly off for Feral due to weapon dps missing.',
}

const survivalInsticts: Ability = {
  name: 'Survival Instincts',
  dr: 0.5,
  spellId: 61336,
  icon: 'ability_druid_tigersroar',
  absorb: {
    versAffected: true,
  },
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
    {
      otherSpellId: survivalInsticts.spellId,
      field: 'absorb',
      absorbField: 'apMultipler',
      value: 3.125,
    },
  ],
  icon: 'inv_misc_pelt_15',
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

export const naturesGuardian: Ability = {
  name: "Mastery: Nature's Guardian",
  spellId: 155783,
  icon: 'spell_druid_primaltenacity',
  onByDefault: true,
  notes: '% HP equal to mastery %',
}

const rageOfTheSleeper: Ability = {
  name: 'Rage of the Sleeper',
  spellId: 200851,
  icon: 'inv_hand_1h_artifactursoc_d_01',
  dr: 0.25,
}

const reinforcedFur: Ability = {
  name: 'Reinforced Fur',
  spellId: 393618,
  icon: 'spell_nature_spiritarmor',
  abilityAugmentations: [
    {
      otherSpellId: barkskin.spellId,
      field: 'dr',
      value: 0.1,
    },
  ],
}

const rendAndTear: Ability = {
  name: 'Rend and Tear',
  spellId: 204053,
  icon: 'ability_druid_swipe',
  damageDealtReduction: 0.02,
  stacks: {
    type: 'stacks',
    max: 5,
  },
}

const scintillatingMoonlight: Ability = {
  name: 'Scintillating Moonlight',
  spellId: 238049,
  icon: 'spell_fire_twilightfireward',
  damageDealtReduction: 0.05,
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const pulverize: Ability = {
  name: 'Pulverize',
  spellId: 80313,
  icon: 'spell_druid_malfurionstenacity',
  damageDealtReduction: 0.35,
}

const incarnationGuardian: Ability = {
  name: 'Incarnation: Guardian of Ursoc',
  spellId: 102558,
  icon: 'spell_druid_incarnation',
  healthIncrease: 0.3,
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

export const druidGuardianAbilities = [
  reinforcedFur,
  naturesGuardian,
  thickHide,
  risingLight,
  rendAndTear,
  scintillatingMoonlight,
  pulverize,
  incarnationGuardian,
  survivalInsticts,
  rageOfTheSleeper,
  barkskin,
]
