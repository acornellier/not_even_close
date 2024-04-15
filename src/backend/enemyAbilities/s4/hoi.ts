import type { EnemyAbility } from '../enemies'
import { getEnemySpellS4 } from '../grimoire'

const staticSurge = getEnemySpellS4(384015, (baseSpell) => ({
  damage: baseSpell.damage * 3,
  periodic: true,
  cooldown: 28,
}))

const powerOverload = getEnemySpellS4(389179, {
  damage: 54713 * 6,
  periodic: true,
  cooldown: 28,
})

const overpoweringCroak = getEnemySpellS4(385187, (baseSpell) => ({
  damage: baseSpell.damage * 3,
  periodic: true,
  cooldown: 38,
}))

const toxicEffluvia = getEnemySpellS4(385451, (baseSpell) => ({
  damage: baseSpell.damage * 3,
  periodic: true,
  cooldown: 26,
}))

const tempestsFury = getEnemySpellS4(388424)

const tempestsFury32: EnemyAbility = {
  ...tempestsFury,
  name: "Tempest's Fury @ 20 stacks",
  damage: Math.round(tempestsFury.damage * 1.2),
  notes: 'Assumes all 4 ads channel for 25 seconds each. More likely to be ~15 stacks.',
}

const lightningBlast = getEnemySpellS4(395690, {
  trashAbility: true,
  outrange: 40,
})

const deepChill = getEnemySpellS4(391634, {
  trashAbility: true,
})

const inundate = getEnemySpellS4(388882, {
  trashAbility: true,
  outrange: 40,
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
