import { getEnemySpell } from '../grimoire.ts'

const putridWaters = getEnemySpell(275014, {
  cooldown: 20,
  combatDrop: 'cancel',
})

const azeriteCharge = getEnemySpell(454439, {
  trashAbility: true,
  combatDrop: 'cancel',
})

const fireBomb = getEnemySpell(256639, {
  trashAbility: true,
})

const crushingSlam = getEnemySpell(272711, {
  trashAbility: true,
  cooldown: 20,
  los: true,
})

const brackishBolt = getEnemySpell(257063, {
  trashAbility: true,
  avoidable: true,
})

const breakWaterBase = getEnemySpell(257883, { effectIndex: 1 })
const breakWater = {
  ...breakWaterBase,
  name: `${breakWaterBase.name} (x3)`,
  damage: 3 * breakWaterBase.damage,
  cooldown: 20,
}

const slam = getEnemySpell(269266, {
  cooldown: [13, 18],
})

export const sobAbilities = [
  fireBomb,
  brackishBolt,
  azeriteCharge,
  crushingSlam,
  breakWater,
  putridWaters,
  slam,
]
