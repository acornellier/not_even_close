import { Ability } from '../ability'

const aspectOfTheBeast: Ability = {
  name: 'Aspect of the Beast',
  spellId: 191384,
  onByDefault: true,
  iconName: 'ability_deathwing_assualtaspects',
  abilityAugmentations: [
    {
      otherSpellId: 264662,
      field: 'healthIncrease',
      value: 0.025,
    },
  ],
}

const rejuvenatingWind: Ability = {
  name: 'Rejuvenating Wind',
  healthIncrease: 0.08,
  onByDefault: true,
  spellId: 385539,
  iconName: 'ability_druid_galewinds',
}

const huntersAvoidance: Ability = {
  name: "Hunter's Avoidance",
  aoeDr: 0.06,
  onByDefault: true,
  spellId: 384799,
  iconName: 'rogue_burstofspeed',
}

const enduranceTraining: Ability = {
  name: 'Endurance Training',
  healthIncrease: 0.05,
  onByDefault: true,
  spellId: 264662,
  iconName: 'ability_hunter_huntervswild',
}

const survivalOfTheFittest: Ability = {
  name: 'Survival of the Fittest',
  dr: 0.2,
  spellId: 264735,
  iconName: 'spell_nature_spiritarmor',
}

const naturesEndurance: Ability = {
  name: "Nature's Endurance",
  spellId: 388042,
  onByDefault: true,
  iconName: 'spell_nature_protectionformnature',
  abilityAugmentations: [
    {
      otherSpellId: 264735,
      field: 'dr',
      value: 0.2,
    },
  ],
}

const fortitudeOfTheBear: Ability = {
  name: 'Fortitude of the Bear',
  healthIncrease: 0.2,
  spellId: 388035,
  iconName: 'spell_druid_bearhug',
}

export const hunterMmSurvAbilities = [
  naturesEndurance,
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTraining,
  survivalOfTheFittest,
  fortitudeOfTheBear,
]

export const hunterBmAbilities = [
  aspectOfTheBeast,
  naturesEndurance,
  rejuvenatingWind,
  huntersAvoidance,
  enduranceTraining,
  survivalOfTheFittest,
  fortitudeOfTheBear,
]
