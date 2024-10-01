import { getEnemySpell } from '../grimoire.ts'

const shatteringBelow = getEnemySpell(257732, {
  cooldown: 19,
  ignoresArmor: true,
})

const putridWaters = getEnemySpell(275014, {
  cooldown: 20,
  notes: 'Only the initial hit',
})

const azeriteCharge = getEnemySpell(454439, {
  trashAbility: true,
  combatDrop: 'cancel',
})

const fireBomb = getEnemySpell(256639, {
  trashAbility: true,
})

const crushingSlam = getEnemySpell(272711, (spell) => ({
  damage: spell.damage * 0.6,
  trashAbility: true,
  ignoresArmor: true,
  cooldown: 20,
  los: true,
}))

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
  ignoresArmor: true,
  cooldown: [13, 18],
})

export const sobAbilities = [
  shatteringBelow,
  fireBomb,
  brackishBolt,
  azeriteCharge,
  crushingSlam,
  breakWater,
  putridWaters,
  slam,
]
