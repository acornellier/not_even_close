import { getEnemySpell, trashSpell } from '../grimoire.ts'

const refractingBeam = getEnemySpell(424805)

const earthShaterer = getEnemySpell(424879)

const seismicSmash = getEnemySpell(424888, {
  tankOnly: true,
})

const metalSplinters = getEnemySpell(428535)

const groundPound = getEnemySpell(425974, {
  trashAbility: true,
})

const smashRock = getEnemySpell(428879, {
  trashAbility: true,
})

const entropicReckoning = getEnemySpell(427854)

const igneousHammer = getEnemySpell(428711, {
  tankOnly: true,
})

const shadowClaw = getEnemySpell(459210, {
  tankOnly: true,
  trashAbility: true,
})

const moltenMortar = trashSpell(449154)

export const svAbilities = [
  refractingBeam,
  earthShaterer,
  seismicSmash,
  igneousHammer,
  metalSplinters,
  groundPound,
  moltenMortar,
  shadowClaw,
  smashRock,
  entropicReckoning,
]
