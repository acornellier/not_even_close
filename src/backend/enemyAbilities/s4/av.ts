import { getEnemySpell } from '../grimoire'

const explosiveBrand = getEnemySpell(374582, { cooldown: 50 })

const consumingStomp = getEnemySpell(374731, { cooldown: 50 })

const frostBomb = getEnemySpell(386910, {
  cooldown: [15, 30],
})

const absoluteZero = getEnemySpell(388008, (baseSpell) => ({
  damage: baseSpell.damage / 2,
  cooldown: 60,
  notes: 'Assumes you have 50% DR',
}))

const unleashedDestruction = getEnemySpell(388804, { cooldown: 105 })

const shoulderSlam = getEnemySpell(436652, {
  trashAbility: true,
  cooldown: 12,
  outrange: 40,
})

export const avAbilities = [
  explosiveBrand,
  consumingStomp,
  frostBomb,
  absoluteZero,
  unleashedDestruction,
  shoulderSlam,
]
