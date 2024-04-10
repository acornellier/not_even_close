import { getEnemySpellS4 } from '../grimoire'

const lavaSpray = getEnemySpellS4(388296, {
  cooldown: 30,
  counterplay: {
    combatDrop: 'cancel',
    outrange: 40,
  },
})

const volatileMutation = getEnemySpellS4(375890, {
  name: 'Volatile Mutation',
  icon: 'ability_rhyolith_magmaflow_whole',
  cooldown: 33,
})

const dragonStrike = getEnemySpellS4(373735, {
  cooldown: 57,
})

const groundingSpear = getEnemySpellS4(396672, {
  cooldown: 57,
})

const blazingAegis = getEnemySpellS4(374839, {
  damage: 218851 + 65655 * 4,
  periodic: true,
  cooldown: 31,
  counterplay: {
    combatDrop: 'cancel',
  },
  notes: 'Initial hit + 4 ticks',
})

const scorchingFusillade = getEnemySpellS4(372542, {
  trashAbility: true,
  cooldown: 23,
})

const candescentTempest = getEnemySpellS4(381663, {
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
