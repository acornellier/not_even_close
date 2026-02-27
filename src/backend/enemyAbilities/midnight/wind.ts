import { bossSpell, trashSpell } from '../grimoire.ts'

const brutalChop = trashSpell(1277799, {
  tankOnly: true,
})

const fallingRubble = bossSpell(1283357, {
  avoidable: true,
})

const rallyingBellow = bossSpell(468221)

export const windAbilities = [
  brutalChop,
  fallingRubble,
  rallyingBellow,
]
