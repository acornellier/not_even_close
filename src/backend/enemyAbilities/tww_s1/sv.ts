import { getEnemySpell } from '../grimoire.ts'

const refractingBeam = getEnemySpell(424805)

const earthShaterer = getEnemySpell(424879)

const seismicSmash = getEnemySpell(424888, {
  tankOnly: true,
})

const metalSplinters = getEnemySpell(428535)

const groundPound = getEnemySpell(425974, {
  trashAbility: true,
})

const smashGround = getEnemySpell(428879, {
  trashAbility: true,
})

const entropicReckoning = getEnemySpell(427854)

export const svAbilities = [
  refractingBeam,
  earthShaterer,
  seismicSmash,
  metalSplinters,
  groundPound,
  smashGround,
  entropicReckoning,
]
