import { bossSpell, trashSpell } from '../grimoire.ts'

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

export const pitAbilities = [
  torrentOfMisery,
  iceBolt,
  shadowBolt,
  orebreaker,
  cryostomp,
  plagueExpulsion,
  deathBolt,
  cryoburst,
]
