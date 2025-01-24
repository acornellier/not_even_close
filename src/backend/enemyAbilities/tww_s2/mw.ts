import { getEnemySpell } from '../grimoire.ts'

const blazingChomp = getEnemySpell(294961)

const gigaWallop = getEnemySpell(293827, {
  trashAbility: true,
})

const gigazapP1 = getEnemySpell(291928, (spell) => ({
  name: `${spell.name} (P1)`,
}))

const gigazapP2 = getEnemySpell(292267, (spell) => ({
  name: `${spell.name} (P2)`,
}))

export const mwAbilities = [blazingChomp, gigaWallop, gigazapP1, gigazapP2]
