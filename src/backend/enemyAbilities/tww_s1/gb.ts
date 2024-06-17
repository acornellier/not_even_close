import { getEnemySpell } from '../grimoire.ts'

const rockSpike = getEnemySpell(448882)

const moltenWake = getEnemySpell(451965, {
  trashAbility: true,
})

export const gbAbilities = [rockSpike, moltenWake]
