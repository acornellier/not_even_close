import { bossSpell, trashSpell } from '../grimoire.ts'

const volatileEjection = trashSpell(1226165)

const unstableCore = trashSpell(1231252)

const gloomBite = trashSpell(1222341, {
  tankOnly: true,
})

const whispersOfFate = bossSpell(1249985)

const dreadOfTheUnknown = bossSpell(1225308)

const splintersOfFate = bossSpell(1224868)

const echoesOfFate = bossSpell(1242006, {
  periodic: true,
})

export const eda = [
  volatileEjection,
  unstableCore,
  gloomBite,
  echoesOfFate,
  whispersOfFate,
  dreadOfTheUnknown,
  splintersOfFate,
]
