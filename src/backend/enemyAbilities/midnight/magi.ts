import { bossSpell, trashSpell } from '../grimoire.ts'

const crowdDispersal = trashSpell(473258)

const arcaneExpulsion = bossSpell(1214081, {
  periodic: true,
})

const suppressionZone = bossSpell(1224903, {
  tankOnly: true,
})

const hulkingFragment = bossSpell(1280119, {
  tankOnly: true,
})

const waveOfSilence = bossSpell(1225201)

const entropyOrb = bossSpell(1269631, {
  avoidable: true,
})

export const magiAbilities = [
  crowdDispersal,
  arcaneExpulsion,
  suppressionZone,
  hulkingFragment,
  waveOfSilence,
  entropyOrb,
]
