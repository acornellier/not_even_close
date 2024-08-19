import { getEnemySpell } from '../grimoire.ts'

const earthShaterer = getEnemySpell(424879)

const metalSplinters = getEnemySpell(428535)

const groundPound = getEnemySpell(425974, {
  trashAbility: true,
})

const smashGround = getEnemySpell(428879, {
  trashAbility: true,
})

export const svAbilities = [earthShaterer, metalSplinters, groundPound, smashGround]
