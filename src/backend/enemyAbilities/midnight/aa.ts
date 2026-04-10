import { bossSpell, trashSpell } from '../grimoire.ts'

const burstForth = bossSpell(388923)

const expelIntruders = trashSpell(377912, {
  avoidable: true,
})

const ragingScreech = trashSpell(1276632, {
  ignoresArmor: true,
})

const deafeningScreech = bossSpell(377009)

const surge = trashSpell(388862, {
  avoidable: true,
})

const arcaneFissure = bossSpell(388537)

const arcaneBolt = trashSpell(1279627, {
  avoidable: true,
})

const arcaneSmash = trashSpell(1270356)

export const aaAbilities = [
  burstForth,
  expelIntruders,
  ragingScreech,
  deafeningScreech,
  surge,
  arcaneFissure,
  arcaneBolt,
  arcaneSmash,
]
