import { bossSpell, trashSpell } from '../grimoire.ts'

const decimate = bossSpell(244579, {
  avoidable: true,
})

const backlash = bossSpell(1266001, {
  avoidable: true,
})

export const seatAbilities = [
  decimate,
  backlash,
]
