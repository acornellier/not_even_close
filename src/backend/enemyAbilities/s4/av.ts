import { getEnemySpell } from '../grimoire'

const infusedStrike = getEnemySpell(374789, {
  tankOnly: true,
})

const eruptingFissure = getEnemySpell(386660, {
  tankOnly: true,
})

const explosiveBrand = getEnemySpell(374582, {
  damage: 331247,
  cooldown: 50,
})

const consumingStomp = getEnemySpell(374731, {
  cooldown: 50,
})

const consumingStomp1Flower = {
  ...consumingStomp,
  name: 'Stomp with 1 flower',
  damage: consumingStomp.damage * 1.2,
}

const frostBomb = getEnemySpell(386910, {
  cooldown: [15, 30],
})

const absoluteZero = getEnemySpell(388008, (baseSpell) => ({
  damage: baseSpell.damage / 2,
  cooldown: 60,
  notes: 'Assumes you have 50% DR',
}))

const unleashedDestruction = getEnemySpell(388804, {
  cooldown: 105,
})

const dragonStrike = getEnemySpell(384978, {
  tankOnly: true,
  cooldown: 18,
})

const shoulderSlam = getEnemySpell(436652, {
  trashAbility: true,
  cooldown: 12,
  outrange: 40,
})

const bestialRoar = getEnemySpell(396991, {
  trashAbility: true,
  outrange: 30,
})

export const avAbilities = [
  infusedStrike,
  eruptingFissure,
  explosiveBrand,
  consumingStomp,
  consumingStomp1Flower,
  frostBomb,
  absoluteZero,
  unleashedDestruction,
  dragonStrike,
  shoulderSlam,
  bestialRoar,
]
