import { getEnemySpell } from '../grimoire.ts'

const putridBomb = getEnemySpell(275014)

const goreCrash = getEnemySpell(257326, {
  effectIndex: 1,
})

const azeriteCharge = getEnemySpell(454439, {
  trashAbility: true,
})

const fireBomb = getEnemySpell(256639, {
  trashAbility: true,
})

const crushingSlam = getEnemySpell(272711, {
  trashAbility: true,
})

export const sobAbilities = [putridBomb, goreCrash, fireBomb, azeriteCharge, crushingSlam]
