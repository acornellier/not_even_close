import { bossSpell, trashSpell } from '../grimoire.ts'

const supernova = bossSpell(154135)

const fierySmash = bossSpell(154132, {
  tankOnly: true,
})

const solarFire = trashSpell(1258220, {
  avoidable: true,
})

const coalescedWind = bossSpell(1258140, {
  avoidable: true,
})

const searingQuills = bossSpell(159381, {
  avoidable: true,
})

export const skyAbilities = [
  supernova,
  fierySmash,
  solarFire,
  coalescedWind,
  searingQuills,
]
