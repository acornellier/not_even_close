import { bossSpell, trashSpell } from '../grimoire.ts'

const detonate = trashSpell(301088, {
  avoidable: true,
})

const blazingChomp = bossSpell(294961, {
  notes: 'The explosion from the dispel',
})

const gigaWallop = trashSpell(293827, {
  avoidable: true,
})

const selfTrimmingHedge = bossSpell(294954, {
  avoidable: true,
  ignoresArmor: true,
})

const gigazapP1 = bossSpell(291928, (spell) => ({
  name: `${spell.name} (P1)`,
}))

const gigazapP2 = bossSpell(292267, (spell) => ({
  name: `${spell.name} (P2)`,
}))

const shortOut = trashSpell(297127, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
}))

export const mwAbilities = [
  detonate,
  blazingChomp,
  gigaWallop,
  selfTrimmingHedge,
  gigazapP1,
  gigazapP2,
  shortOut,
]
