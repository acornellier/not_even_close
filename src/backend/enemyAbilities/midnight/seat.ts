import { bossSpell, trashSpell } from '../grimoire.ts'
import { scaledDamage, scalingTickingDamage } from './s1-mult.ts'

const crashingVoid = bossSpell(1263297)

const decimate = bossSpell(244579, {
  avoidable: true,
})

const voidBomb = bossSpell(246026)

const overload = bossSpell(1263523)

const shadowPounce = bossSpell(245742)

const backlash = bossSpell(1266001)

const massVoidInfusion = bossSpell(1263542, () => ({
  aoe: true,
  damage: scalingTickingDamage(6, 6),
  periodic: true,
}))

const eruption = trashSpell(1262441, () => ({
  periodic: true,
  aoe: true,
  damage: scaledDamage(14) + scalingTickingDamage(8, 4),
}))

const dirgeOfDespair = bossSpell(1265421)

export const seatAbilities = [
  crashingVoid,
  decimate,
  voidBomb,
  overload,
  shadowPounce,
  backlash,
  massVoidInfusion,
  eruption,
  dirgeOfDespair,
]
