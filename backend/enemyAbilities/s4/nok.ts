import { getEnemySpellS4 } from '../grimoire'

const shardsOfStone = getEnemySpellS4(388817, {
  cooldown: [13, 25],
})

const lightningStrike = getEnemySpellS4(384186, {
  cooldown: 20,
})

const galeArrow = getEnemySpellS4(386037, {
  cooldown: 57,
})

const ironSpear = getEnemySpellS4(376660, {
  cooldown: 35,
  combatDrop: 'cancel',
})

const staticSpear = getEnemySpellS4(376866, (baseSpell) => ({
  damage: 364751 + baseSpell.damage,
  cooldown: 39,
  counterplay: {
    combatDrop: 'cancel',
  },
}))

const cracklingUpheaval = getEnemySpellS4(376896, {
  cooldown: 37,
})

const lightning = getEnemySpellS4(376737, {
  avoidable: true,
  notes: 'Swirlies during Balakar Khan intermission and P2',
})

const rainOfArrows = getEnemySpellS4(384479, {
  trashAbility: true,
  avoidable: true,
  notes: 'Swirlies cast by Nokhud Longbow in first area',
})

const chainLightning = getEnemySpellS4(387127, {
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
