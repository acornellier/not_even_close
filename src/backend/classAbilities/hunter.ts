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

const rejuvenatingWind: Ability = {
  name: 'Rejuvenating Wind',
  healthIncrease: 0.08,
  onByDefault: true,
  id: 385539,
  passive: true,
  icon: 'ability_druid_galewinds',
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

const fortitudeOfTheBear: Ability = {
  name: 'Fortitude of the Bear',
  healthIncrease: 0.2,
  id: 388035,
  icon: 'spell_druid_bearhug',
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

export const hunterBmAbilities = [
  aspectOfTheBeast,
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTraining,
  aspectOfTheTurtle,
  fortitudeOfTheBear,
  survivalOfTheFittest,
]

export const hunterMmAbilities = [
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTrainingMm,
  dontLookBack,
  aspectOfTheTurtle,
  fortitudeOfTheBear,
  survivalOfTheFittest,
]

export const hunterSurvAbilities = [
  spiritBond,
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTraining,
  dontLookBack,
  aspectOfTheTurtle,
  fortitudeOfTheBear,
  survivalOfTheFittest,
]
