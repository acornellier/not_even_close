import { bossSpell, trashSpell } from '../grimoire.ts'

const glacialTorment = bossSpell(1235549, (spell) => ({
  damage: spell.periodicDamage,
  notes: 'Assumes full duration (16s); players typically took 2 of 9 ticks.',
  periodic: true,
}))

const heartyBellow = bossSpell(1235125, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const ravenousBellow = bossSpell(1234681, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const razorDive = trashSpell(1238439, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const overwhelmingOnslaught = bossSpell(1297793, { aoe: true })

const toxicSpores = bossSpell(1234846, (spell) => ({
  damage: spell.periodicDamage,
  notes: 'Assumes full duration (12s); players typically took 3 of 7 ticks.',
  periodic: true,
}))

const primalEcho = trashSpell(1246957, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const echoingMaul = bossSpell(1242887, { aoe: true })

const glacialTomb = trashSpell(1241464, (spell) => ({
  damage: spell.damage * 5,
  periodic: true,
}))

const earthquake = trashSpell(1247366, { aoe: true })

const rimeDetonation = trashSpell(1263597, { aoe: true })

const demoralizingScream = trashSpell(1262253, { aoe: true })

const shoot = trashSpell(1246847, { tankOnly: true })

const lightningBolt = trashSpell(1246687)

const earthBolt = trashSpell(1241214)

const spoiledSupplies = bossSpell(1234734)

const wintersShroud = trashSpell(1235829, { aoe: true })

const bonespiked = bossSpell(1235405, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
}))

const echoingFury = bossSpell(1243408)

export const naloAbilities = [
  glacialTorment,
  heartyBellow,
  ravenousBellow,
  razorDive,
  overwhelmingOnslaught,
  toxicSpores,
  primalEcho,
  echoingMaul,
  glacialTomb,
  earthquake,
  rimeDetonation,
  demoralizingScream,
  shoot,
  lightningBolt,
  earthBolt,
  spoiledSupplies,
  wintersShroud,
  bonespiked,
  echoingFury,
]
