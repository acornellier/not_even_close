import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from './s1-mult.ts'

const crowdDispersal = trashSpell(473258)

const arcaneExpulsion = bossSpell(1214081)

const suppressionZone = bossSpell(1224903, {
  tankOnly: true,
})

const hulkingFragment = bossSpell(1280119, {
  tankOnly: true,
})

const waveOfSilence = bossSpell(1225201)

const astralGrasp = bossSpell(1224299, () => ({
  damage: scalingTickingDamage(9, 4),
  periodic: true,
}))

const arcaneBeam = trashSpell(1282051, (spell) => ({
  periodic: true,
  damage: spell.damage * 6,
}))

const ignition = trashSpell(1254338, () => ({
  aoe: true,
  damage: scalingTickingDamage(10, 3),
  periodic: true,
}))

export const magiAbilities = [
  crowdDispersal,
  arcaneExpulsion,
  suppressionZone,
  hulkingFragment,
  waveOfSilence,
  astralGrasp,
  arcaneBeam,
  ignition,
]
