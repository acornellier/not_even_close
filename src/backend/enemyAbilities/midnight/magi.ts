import { bossSpell, trashSpell } from '../grimoire.ts'

const crowdDispersal = trashSpell(473258)

const arcaneExpulsion = bossSpell(1214081)

const suppressionZone = bossSpell(1224903, {
  tankOnly: true,
})

const hulkingFragment = bossSpell(1280119, {
  tankOnly: true,
})

const waveOfSilence = bossSpell(1225201)

export const magiAbilities = [
  crowdDispersal,
  arcaneExpulsion,
  suppressionZone,
  hulkingFragment,
  waveOfSilence,
]
