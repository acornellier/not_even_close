import { getEnemySpell } from '../grimoire.ts'

const goreCrash = getEnemySpell(257326, {
  effectIndex: 1,
})

const putridBomb = getEnemySpell(275014)

const azeriteCharge = getEnemySpell(454439, {
  trashAbility: true,
})

const fireBomb = getEnemySpell(256639, {
  trashAbility: true,
})

const crushingSlam = getEnemySpell(272711, {
  trashAbility: true,
})

const brackishBolt = getEnemySpell(257063, {
  trashAbility: true,
  avoidable: true,
})

export const sobAbilities = [
  goreCrash,
  putridBomb,
  fireBomb,
  brackishBolt,
  azeriteCharge,
  crushingSlam,
]
