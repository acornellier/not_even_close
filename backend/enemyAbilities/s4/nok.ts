import { getEnemySpellS4 } from '../grimoire'

const shardsOfStone = getEnemySpellS4(388817, {
  timeBetweenCasts: [13, 25],
})

const lightningStrike = getEnemySpellS4(384186, {
  timeBetweenCasts: 20,
})

const galeArrow = getEnemySpellS4(386037, {
  timeBetweenCasts: 57,
})

const ironSpear = getEnemySpellS4(376660, {
  timeBetweenCasts: 35,
  counterplay: {
    combatDrop: 'cancel',
  },
})

const staticSpear = getEnemySpellS4(376866, (baseSpell) => ({
  baseDamage: 364751 + baseSpell.baseDamage,
  timeBetweenCasts: 39,
  counterplay: {
    combatDrop: 'cancel',
  },
}))

const cracklingUpheaval = getEnemySpellS4(376896, {
  timeBetweenCasts: 37,
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
  timeBetweenCasts: 24,
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
