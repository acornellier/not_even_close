import { getEnemySpellS4 } from '../grimoire'

const explosiveBrand = getEnemySpellS4(374582, { timeBetweenCasts: 50 })

const consumingStomp = getEnemySpellS4(374731, { timeBetweenCasts: 50 })

const frostBomb = getEnemySpellS4(386910, {
  timeBetweenCasts: [15, 30],
})

const absoluteZero = getEnemySpellS4(388008, (baseSpell) => ({
  baseDamage: baseSpell.baseDamage / 2,
  timeBetweenCasts: 60,
  notes: 'Assumes you have 50% DR',
}))

const unleashedDestruction = getEnemySpellS4(388804, { timeBetweenCasts: 105 })

const shoulderSlam = getEnemySpellS4(436652, {
  trashAbility: true,
  timeBetweenCasts: 12,
  counterplay: {
    outrange: 40,
  },
})

export const avAbilities = [
  explosiveBrand,
  consumingStomp,
  frostBomb,
  absoluteZero,
  unleashedDestruction,
  shoulderSlam,
]
