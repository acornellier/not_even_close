import { bossSpell, trashSpell } from '../grimoire.ts'

const razorDive = trashSpell(1238439, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const earthBolt = trashSpell(1241214, { avoidable: true })

const ravenousBellow = bossSpell(1234681, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const spoiledSupplies = bossSpell(1234734)

const toxicSpores = bossSpell(1234846, (spell) => ({
  damage: spell.periodicDamage,
  notes: 'Assumes full duration (12s); players typically took 3 of 7 ticks.',
  avoidable: true,
  periodic: true,
}))

const heartyBellow = bossSpell(1235125, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const bonespiked = bossSpell(1235405, (spell) => ({
  damage: spell.damage * 6,
  avoidable: true,
  periodic: true,
}))

const glacialTomb = trashSpell(1241464, (spell) => ({
  damage: spell.damage * 5,
  periodic: true,
}))

const glacialTorment = bossSpell(1235549, (spell) => ({
  damage: spell.periodicDamage,
  notes: 'Assumes full duration (16s); players typically took 2 of 9 ticks.',
  periodic: true,
}))

const wintersShroud = trashSpell(1235829, { aoe: true })

const rimeDetonation = trashSpell(1263597, { aoe: true })

const ragingSquall = bossSpell(1235635, { avoidable: true, aoe: true })

const shoot = trashSpell(1246847, { tankOnly: true })

const primalEcho = trashSpell(1246957, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const lightningBolt = trashSpell(1246687, { avoidable: true })

const earthquake = trashSpell(1247366, { avoidable: true, aoe: true })

const echoingMaul = bossSpell(1242887, { avoidable: true, aoe: true })

const overwhelmingOnslaught = bossSpell(1297793, { aoe: true })

const echoingFury = bossSpell(1243408, { avoidable: true })

const demoralizingScream = trashSpell(1262253, { aoe: true })

export const naloAbilities = [
  razorDive,
  earthBolt,
  ravenousBellow,
  spoiledSupplies,
  toxicSpores,
  heartyBellow,
  bonespiked,
  glacialTomb,
  glacialTorment,
  wintersShroud,
  rimeDetonation,
  ragingSquall,
  shoot,
  primalEcho,
  lightningBolt,
  earthquake,
  echoingMaul,
  overwhelmingOnslaught,
  echoingFury,
  demoralizingScream,
]
