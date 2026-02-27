import { bossSpell, trashSpell } from '../grimoire.ts'

const arcaneExpulsion = bossSpell(385958, {
  avoidable: true,
})

const expelIntruders = trashSpell(377912, {
  avoidable: true,
})

const powerVacuum = bossSpell(388822, {
  avoidable: true,
})

export const aaAbilities = [
  arcaneExpulsion,
  expelIntruders,
  powerVacuum,
]
