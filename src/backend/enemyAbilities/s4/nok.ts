import { getEnemySpell } from '../grimoire'

const shardsOfStone = getEnemySpell(388817, {
  cooldown: [13, 25],
})

const lightningStrike = getEnemySpell(384186, {
  cooldown: 20,
})

const galeArrow = getEnemySpell(386037, {
  cooldown: 57,
})

const ironSpear = getEnemySpell(376660, {
  cooldown: 35,
  combatDrop: 'cancel',
})

const staticSpear = getEnemySpell(376866, (baseSpell) => ({
  damage: 364751 + baseSpell.damage,
  cooldown: 39,
  combatDrop: 'cancel',
}))

const cracklingUpheaval = getEnemySpell(376896, {
  cooldown: 37,
})

const lightning = getEnemySpell(376737, {
  avoidable: true,
  notes: 'Swirlies during Balakar Khan intermission and P2',
})

const rainOfArrows = getEnemySpell(384479, {
  trashAbility: true,
  avoidable: true,
  notes: 'Swirlies cast by Nokhud Longbow in first area',
})

const chainLightning = getEnemySpell(387127, {
  trashAbility: true,
  cooldown: 24,
})

export const nokAbilities = [
  shardsOfStone,
  lightningStrike,
  galeArrow,
  ironSpear,
  staticSpear,
  cracklingUpheaval,
  lightning,
  rainOfArrows,
  chainLightning,
]
