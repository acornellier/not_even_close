import { getEnemySpell } from '../grimoire.ts'

const metalSplinters = getEnemySpell(428535, {
  effectIndex: 1,
})

const groundPound = getEnemySpell(425974, {
  trashAbility: true,
})

const smashGround = getEnemySpell(428879, {
  trashAbility: true,
})

export const svAbilities = [metalSplinters, groundPound, smashGround]
