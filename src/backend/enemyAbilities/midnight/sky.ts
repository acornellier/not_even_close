import { bossSpell, trashSpell } from '../grimoire.ts'

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

export const skyAbilities = [
  bladeRush,
  dreadWind,
  galeSurge,
  supernova,
  sunbreak,
  searingQuills,
]
