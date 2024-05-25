import { getEnemySpell } from '../grimoire'

const shardsOfStone = getEnemySpell(388817, {
  cooldown: [13, 25],
})

const lightningStrike = getEnemySpell(384186, {
  cooldown: 20,
})

const brutalize = getEnemySpell(382836, {
  tankOnly: true,
})

const galeArrow = getEnemySpell(386016, {
  cooldown: 57,
})

const rendingStrike = getEnemySpell(375937, {
  tankOnly: true,
})

const ironSpear = getEnemySpell(376660, {
  cooldown: 35,
  combatDrop: 'cancel',
  affectedByArmor: true,
})

const conductiveStrike = getEnemySpell(376827, {
  tankOnly: true,
})

const staticSpear = getEnemySpell(376866, {
  cooldown: 39,
  combatDrop: 'cancel',
})

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
  brutalize,
  galeArrow,
  rendingStrike,
  ironSpear,
  conductiveStrike,
  staticSpear,
  cracklingUpheaval,
  lightning,
  rainOfArrows,
  chainLightning,
]
