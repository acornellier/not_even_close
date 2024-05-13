import type { EnemyAbility } from '../enemies'
import { getEnemySpell } from '../grimoire'

const staticSurge = getEnemySpell(384015, (baseSpell) => ({
  damage: baseSpell.damage * 3,
  periodic: true,
  cooldown: 28,
}))

const powerOverload = getEnemySpell(389179, {
  damage: 54713 * 6,
  periodic: true,
  cooldown: 28,
})

const overpoweringCroak = getEnemySpell(385187, (baseSpell) => ({
  damage: baseSpell.damage * 3,
  periodic: true,
  cooldown: 38,
}))

const toxicEffluvia = getEnemySpell(385451, (baseSpell) => ({
  damage: baseSpell.damage * 3,
  periodic: true,
  cooldown: 26,
}))

const tempestsFury = getEnemySpell(388424)

const tempestsFury32: EnemyAbility = {
  ...tempestsFury,
  name: 'Fury @ 20 stacks',
  damage: Math.round(tempestsFury.damage * 1.2),
  notes: 'Assumes all 4 ads channel for 25 seconds each. More likely to be ~15 stacks.',
}

const lightningBlast = getEnemySpell(395690, {
  trashAbility: true,
  outrange: 40,
})

const deepChill = getEnemySpell(391634, {
  trashAbility: true,
})

const inundate = getEnemySpell(388882, {
  trashAbility: true,
  outrange: 35,
})

export const hoiAbilities = [
  staticSurge,
  powerOverload,
  overpoweringCroak,
  toxicEffluvia,
  tempestsFury,
  tempestsFury32,
  lightningBlast,
  deepChill,
  inundate,
]
