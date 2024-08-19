import { getEnemySpell } from '../grimoire.ts'

const refractingBeam = getEnemySpell(424805)

const earthShaterer = getEnemySpell(424879)

const metalSplinters = getEnemySpell(428535)

const groundPound = getEnemySpell(425974, {
  trashAbility: true,
})

const smashGround = getEnemySpell(428879, {
  trashAbility: true,
})

export const svAbilities = [
  refractingBeam,
  earthShaterer,
  metalSplinters,
  groundPound,
  smashGround,
]
