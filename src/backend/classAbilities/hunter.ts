import type { Ability } from '../ability'

const aspectOfTheBeast: Ability = {
  name: 'Aspect of the Beast',
  id: 191384,
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
  icon: 'ability_druid_galewinds',
}

const huntersAvoidance: Ability = {
  name: "Hunter's Avoidance",
  aoeDr: 0.06,
  onByDefault: true,
  id: 384799,
  icon: 'rogue_burstofspeed',
}

const enduranceTraining: Ability = {
  name: 'Endurance Training',
  healthIncrease: 0.05,
  onByDefault: true,
  id: 264662,
  icon: 'ability_hunter_huntervswild',
}

const enduranceTrainingMm: Ability = {
  ...enduranceTraining,
  onByDefault: false,
}

const survivalOfTheFittest: Ability = {
  name: 'Survival of the Fittest',
  dr: 0.2,
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

const naturesEndurance: Ability = {
  name: "Nature's Endurance",
  id: 388042,
  onByDefault: true,
  icon: 'spell_nature_protectionformnature',
  abilityAugmentations: [
    {
      otherAbilityId: 264735,
      field: 'dr',
      value: 0.2,
    },
  ],
}

const fortitudeOfTheBear: Ability = {
  name: 'Fortitude of the Bear',
  healthIncrease: 0.2,
  id: 388035,
  icon: 'spell_druid_bearhug',
}

export const hunterBmAbilities = [
  aspectOfTheBeast,
  naturesEndurance,
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTraining,
  aspectOfTheTurtle,
  survivalOfTheFittest,
  fortitudeOfTheBear,
]

export const hunterMmAbilities = [
  naturesEndurance,
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTrainingMm,
  aspectOfTheTurtle,
  survivalOfTheFittest,
  fortitudeOfTheBear,
]

export const hunterSurvAbilities = [
  naturesEndurance,
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTraining,
  aspectOfTheTurtle,
  survivalOfTheFittest,
  fortitudeOfTheBear,
]
