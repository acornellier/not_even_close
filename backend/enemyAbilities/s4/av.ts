import { getEnemySpellS4 } from '../grimoire'

const explosiveBrand = getEnemySpellS4(374582, { cooldown: 50 })

const consumingStomp = getEnemySpellS4(374731, { cooldown: 50 })

const frostBomb = getEnemySpellS4(386910, {
  cooldown: [15, 30],
})

const absoluteZero = getEnemySpellS4(388008, (baseSpell) => ({
  damage: baseSpell.damage / 2,
  cooldown: 60,
  notes: 'Assumes you have 50% DR',
}))

const unleashedDestruction = getEnemySpellS4(388804, { cooldown: 105 })

const shoulderSlam = getEnemySpellS4(436652, {
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
