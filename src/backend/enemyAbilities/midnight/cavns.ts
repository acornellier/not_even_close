import { bossSpell, trashSpell } from '../grimoire.ts'

const deafeningRoar = trashSpell(1256047)

const flankingSpear = bossSpell(1266485, {
  tankOnly: true,
})

const vilePotatoad = trashSpell(1257164, {
  avoidable: true,
})

export const cavnsAbilities = [
  deafeningRoar,
  flankingSpear,
  vilePotatoad,
]
