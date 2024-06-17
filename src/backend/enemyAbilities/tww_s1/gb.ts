import { getEnemySpell } from '../grimoire.ts'

const commandingRoar = getEnemySpell(448847, {
  ignoresArmor: true,
})

const umbralWind = getEnemySpell(451939, {
  trashAbility: true,
  los: true,
})

const earthBolt = getEnemySpell(451261, {
  trashAbility: true,
  avoidable: true,
})

const massTremor = getEnemySpell(451871, {
  trashAbility: true,
})

const moltenWake = getEnemySpell(451965, {
  trashAbility: true,
})

const twilightBuffet = getEnemySpell(456751)

export const gbAbilities = [
  commandingRoar,
  twilightBuffet,
  umbralWind,
  earthBolt,
  massTremor,
  moltenWake,
]
