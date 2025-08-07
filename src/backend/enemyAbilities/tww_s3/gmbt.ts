import { bossSpell, trashSpell } from '../grimoire.ts'

const purifyingBurst = bossSpell(353312)

const waterbolt = trashSpell(355225, {
  avoidable: true,
})

const tidalStomp = trashSpell(355429)

const brackishBolt = trashSpell(356843, {
  avoidable: true,
})

const hyperlightJolt = bossSpell(350885)

export const gmbtAbilities = [
  tidalStomp,
  waterbolt,
  purifyingBurst,
  brackishBolt,
  hyperlightJolt,
]
