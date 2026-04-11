import { bossSpell, trashSpell } from '../grimoire.ts'

const brutalChop = trashSpell(1277799, {
  tankOnly: true,
})

const flameNova = trashSpell(1270618)

const rallyingBellow = bossSpell(468221)

export const windAbilities = [brutalChop, flameNova, rallyingBellow]
