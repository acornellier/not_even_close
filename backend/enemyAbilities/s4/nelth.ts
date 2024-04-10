import { getEnemySpellS4 } from '../grimoire'

const lavaSpray = getEnemySpellS4(388296, {
  timeBetweenCasts: 30,
  counterplay: {
    combatDrop: 'cancel',
    outrange: 40,
  },
})

const volatileMutation = getEnemySpellS4(375890, {
  name: 'Volatile Mutation',
  icon: 'ability_rhyolith_magmaflow_whole',
  timeBetweenCasts: 33,
})

const dragonStrike = getEnemySpellS4(373735, {
  timeBetweenCasts: 57,
})

const groundingSpear = getEnemySpellS4(396672, {
  timeBetweenCasts: 57,
})

const blazingAegis = getEnemySpellS4(374839, {
  baseDamage: 218851 + 65655 * 4,
  periodic: true,
  timeBetweenCasts: 31,
  counterplay: {
    combatDrop: 'cancel',
  },
  notes: 'Initial hit + 4 ticks',
})

const scorchingFusillade = getEnemySpellS4(372542, {
  trashAbility: true,
  timeBetweenCasts: 23,
})

const candescentTempest = getEnemySpellS4(381663, {
  baseDamage: (54713 + 91188) * 3,
  trashAbility: true,
  periodic: true,
  timeBetweenCasts: 28,
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
