import { getEnemySpell } from '../grimoire.ts'

const spiritBolt = getEnemySpell(322767, {
  avoidable: true,
  trashAbility: true,
})

const mistveilBite = getEnemySpell(324987, {
  trashAbility: true,
})

const acidNova = getEnemySpell(460092, {
  trashAbility: true,
})

export const motAbilities = [spiritBolt, mistveilBite, acidNova]
