import { bossSpell } from '../grimoire.ts'

const crashingVoid = bossSpell(1263297)

const decimate = bossSpell(244579, {
  avoidable: true,
})

const voidBomb = bossSpell(246026)

const overload = bossSpell(1263523)

const shadowPounce = bossSpell(245742)

const backlash = bossSpell(1266001)

export const seatAbilities = [
  crashingVoid,
  decimate,
  voidBomb,
  overload,
  shadowPounce,
  backlash,
]
