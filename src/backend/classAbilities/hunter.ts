import type { Ability } from '../ability'

const aspectOfTheBeast: Ability = {
  name: 'Aspect of the Beast',
  id: 191384,
  passive: true,
  onByDefault: true,
  icon: 'ability_deathwing_assualtaspects',
  abilityAugmentations: [
    {
      otherAbilityId: 264662,
      field: 'healthIncrease',
      value: 0.025,
    },
  ],
}

const touchOfGrass: Ability = {
  name: 'Touch of Grass',
  healthIncrease: 0.05,
  onByDefault: true,
  id: 1258402,
  passive: true,
  icon: 'inv12_ability_druid_lifetreading',
  stacks: {
    type: 'talent',
    max: 2,
  },
}

const huntersAvoidance: Ability = {
  name: "Hunter's Avoidance",
  aoeDr: 0.05,
  onByDefault: true,
  id: 384799,
  passive: true,
  icon: 'rogue_burstofspeed',
}

const enduranceTraining: Ability = {
  name: 'Endurance Training',
  healthIncrease: 0.05,
  onByDefault: true,
  id: 264662,
  passive: true,
  icon: 'ability_hunter_huntervswild',
}

const enduranceTrainingMm: Ability = {
  ...enduranceTraining,
  id: enduranceTraining.id + 1,
  spellId: enduranceTraining.id,
  dr: 0.03,
  notes: 'Includes Air Superiority',
}

const survivalOfTheFittest: Ability = {
  name: 'Survival of the Fittest',
  dr: 0.3,
  id: 264735,
  icon: 'spell_nature_spiritarmor',
}

const aspectOfTheTurtle: Ability = {
  name: 'Aspect of the Turtle',
  dr: 0.3,
  id: 186265,
  icon: 'ability_hunter_pet_turtle',
  notes: 'Only the DR portion, does not calculate immunities',
}

const shellWall: Ability = {
  name: 'Shell Wall',
  id: 1267218,
  icon: 'inv_cape_special_turtleshell_c_01',
  abilityAugmentations: [
    {
      otherAbilityId: aspectOfTheTurtle.id,
      field: 'dr',
      value: 0.2,
    },
  ],
}

const fortitudeOfTheBear: Ability = {
  name: 'Fortitude of the Bear',
  dr: 0.03,
  id: 388035,
  icon: 'spell_druid_bearhug',
  passive: true,
}

const guardiansHide: Ability = {
  name: "Guardian's Hide",
  dr: 0.03,
  id: 1272094,
  icon: 'spell_druid_bristlingfur',
  passive: true,
}

const dontLookBack: Ability = {
  name: "Don't Look Back",
  id: 450373,
  passive: true,
  icon: 'ability_racial_forceshield',
  heroTree: 'Sentinel',
  absorb: {
    healthMultiplier: 0.1,
    versAffected: true,
  },
}

const spiritBond: Ability = {
  name: 'Mastery: Spirit Bond',
  id: 263135,
  icon: 'ability_hunter_huntervswild',
  dr: 0.06,
  onByDefault: true,
}

const shellCover: Ability = {
  name: 'Shell Cover',
  id: 472707,
  icon: 'inv_babyturtle2',
  passive: true,
  abilityAugmentations: [
    {
      otherAbilityId: survivalOfTheFittest.id,
      field: 'dr',
      value: 0.1,
    },
  ],
}

export const hunterBmAbilities = [
  shellCover,
  shellWall,
  aspectOfTheBeast,
  touchOfGrass,
  huntersAvoidance,
  enduranceTraining,
  guardiansHide,
  fortitudeOfTheBear,
  aspectOfTheTurtle,
  survivalOfTheFittest,
]

export const hunterMmAbilities = [
  shellWall,
  touchOfGrass,
  huntersAvoidance,
  enduranceTrainingMm,
  guardiansHide,
  dontLookBack,
  aspectOfTheTurtle,
  survivalOfTheFittest,
]

export const hunterSurvAbilities = [
  shellCover,
  shellWall,
  spiritBond,
  touchOfGrass,
  huntersAvoidance,
  enduranceTraining,
  guardiansHide,
  fortitudeOfTheBear,
  dontLookBack,
  aspectOfTheTurtle,
  survivalOfTheFittest,
]
