import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage, scaledDamage } from './s1-mult.ts'

const torrentOfMisery = trashSpell(1258826, (spell) => ({
  damage: spell.damage * 7,
  periodic: true,
}))

const iceBolt = trashSpell(1258436, {
  avoidable: true,
})

const shadowBolt = trashSpell(1258431, {
  avoidable: true,
})

const orebreaker = bossSpell(1261546, {
  tankOnly: true,
})

const cryostomp = bossSpell(1261847)

const plagueExpulsion = bossSpell(1264336)

const deathBolt = bossSpell(1278893, {
  avoidable: true,
})

const cryoburst = bossSpell(1259202)

const shadeShift = bossSpell(1264246, (spell) => ({
  damage: scalingTickingDamage(12, 2) + scaledDamage(8),
}))

const focusedGuard = trashSpell(1278754, (spell) => ({
  damage: scalingTickingDamage(9, 4),
  periodic: true,
}))

const boneInfusion = bossSpell(1276648, (spell) => ({
  periodic: true,
  damage: scalingTickingDamage(3, 8) + scaledDamage(8),
}))

export const pitAbilities = [
  torrentOfMisery,
  iceBolt,
  shadowBolt,
  orebreaker,
  cryostomp,
  plagueExpulsion,
  deathBolt,
  cryoburst,
  shadeShift,
  focusedGuard,
  boneInfusion,
]
