import { trashSpell } from '../grimoire.ts'

const volatileEjection = trashSpell(1226165)

const unstableCore = trashSpell(1231252)

const gloomBite = trashSpell(1222341, {
  tankOnly: true,
})

export const eda = [volatileEjection, unstableCore, gloomBite]
