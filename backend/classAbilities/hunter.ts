import { Ability } from '../ability'

export const rejuvenatingWind: Ability = {
  name: 'Rejuvenating Wind',
  healthIncrease: 0.08,
  onByDefault: true,
  spellId: 385539,
  iconName: 'ability_druid_galewinds',
}

export const huntersAvoidance: Ability = {
  name: "Hunter's Avoidance",
  aoeDr: 0.06,
  onByDefault: true,
  spellId: 384799,
  iconName: 'rogue_burstofspeed',
}

export const survivalOfTheFittest: Ability = {
  name: 'Survival of the Fittest',
  dr: 0.4,
  spellId: 264735,
  iconName: 'spell_nature_spiritarmor',
}

export const fortitudeOfTheBear: Ability = {
  name: 'Fortitude of the Bear',
  healthIncrease: 0.2,
  spellId: 388035,
  iconName: 'spell_druid_bearhug',
}

export const hunterAbilities = [
  rejuvenatingWind,
  huntersAvoidance,
  survivalOfTheFittest,
  fortitudeOfTheBear,
]
