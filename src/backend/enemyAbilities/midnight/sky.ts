import { bossSpell, trashSpell } from '../grimoire.ts'
import { scaledDamage, scalingTickingDamage } from './s1-mult.ts'

const bladeRush = trashSpell(1254475)

const dreadWind = trashSpell(1258174)

const galeSurge = bossSpell(1252691)

const supernova = bossSpell(154135)

const sunbreak = bossSpell(1253510)

const searingQuills = bossSpell(159381, (spell) => ({
  damage: spell.damage * 4,
  avoidable: true,
  periodic: true,
}))

const scorchingRay = bossSpell(1253543, () => ({
  damage: scaledDamage(10) + scalingTickingDamage(5, 5),
}))

export const skyAbilities = [
  bladeRush,
  dreadWind,
  galeSurge,
  supernova,
  sunbreak,
  searingQuills,
  scorchingRay,
]
