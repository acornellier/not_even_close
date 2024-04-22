import { getEnemySpell } from '../grimoire'

const lavaSpray = getEnemySpell(388296, {
  cooldown: 30,
  combatDrop: 'cancel',
  outrange: 40,
})

const volatileMutation = getEnemySpell(375890, {
  name: 'Volatile Mutation',
  icon: 'ability_rhyolith_magmaflow_whole',
  cooldown: 33,
})

const dragonStrike = getEnemySpell(373735, {
  cooldown: 57,
})

const groundingSpear = getEnemySpell(396672, {
  cooldown: 57,
})

const blazingAegis = getEnemySpell(374839, {
  damage: 218851 + 65655 * 4,
  periodic: true,
  cooldown: 31,
  combatDrop: 'cancel',
  notes: 'Initial hit + 4 ticks',
})

const scorchingFusillade = getEnemySpell(372542, {
  trashAbility: true,
  cooldown: 23,
})

const candescentTempest = getEnemySpell(381663, {
  damage: (54713 + 91188) * 3,
  trashAbility: true,
  periodic: true,
  cooldown: 28,
})

export const nelthAbilities = [
  lavaSpray,
  volatileMutation,
  dragonStrike,
  groundingSpear,
  blazingAegis,
  scorchingFusillade,
  candescentTempest,
]
