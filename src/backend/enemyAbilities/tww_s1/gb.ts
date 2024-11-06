import { getEnemySpell } from '../grimoire.ts'

const commandingRoar = getEnemySpell(448847, {
  ignoresArmor: true,
  cooldown: 25,
})

const rockSpike = getEnemySpell(448882, {
  cooldown: 25,
})

const umbralWind = getEnemySpell(451939, {
  trashAbility: true,
  los: true,
  cooldown: 30,
})

const earthBolt = getEnemySpell(451261, {
  trashAbility: true,
  avoidable: true,
})

const massTremor = getEnemySpell(451871, {
  trashAbility: true,
  avoidable: true,
})

const lavaFist = getEnemySpell(451971, {
  tankOnly: true,
  trashAbility: true,
})

const moltenWake = getEnemySpell(451965, {
  trashAbility: true,
  cooldown: 20,
})

const twilightBuffet = getEnemySpell(456751, {
  cooldown: 35,
})

export const gbAbilities = [
  commandingRoar,
  rockSpike,
  twilightBuffet,
  umbralWind,
  earthBolt,
  massTremor,
  lavaFist,
  moltenWake,
]
