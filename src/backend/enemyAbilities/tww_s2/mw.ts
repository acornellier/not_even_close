import { bossSpell, trashSpell } from '../grimoire.ts'

const blazingChomp = bossSpell(294961, {
  notes: 'The explosion from the dispel',
})

const gigaWallop = trashSpell(293827, {
  avoidable: true,
})

const gigazapP1 = bossSpell(291928, (spell) => ({
  name: `${spell.name} (P1)`,
}))

const gigazapP2 = bossSpell(292267, (spell) => ({
  name: `${spell.name} (P2)`,
}))

export const mwAbilities = [blazingChomp, gigaWallop, gigazapP1, gigazapP2]
