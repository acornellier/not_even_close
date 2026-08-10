import { bossSpell, trashSpell } from '../grimoire.ts'

const sporeSpines = trashSpell(1238084, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const grievousGash = trashSpell(1242135, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (16s); players typically took 1 of 16 ticks.',
  tankOnly: true,
  periodic: true,
}))

const thornspike = bossSpell(1247685, (spell) => ({
  damage: spell.damage * 11,
  tankOnly: true,
  periodic: true,
}))

const earthruptureStrike = trashSpell(1237855, { tankOnly: true })

const lightfireBeams = bossSpell(1239919, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const lightfire = bossSpell(1239825, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const bedrockSurge = bossSpell(1276586, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const lightblossomBeam = bossSpell(1235574, (spell) => ({
  damage: spell.damage * 4,
  periodic: true,
}))

const lightwardensBlight = trashSpell(1242200, { aoe: true })

const bedrockSlam = bossSpell(1234753, { tankOnly: true })

const tongueToss = trashSpell(1250100)

const grievousThrash = bossSpell(1241058, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (40s); players typically took 1 of 40 ticks.',
  periodic: true,
  aoe: true,
}))

const huntingLeap = trashSpell(1303039, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const thornblade = bossSpell(1238071, (spell) => ({
  damage: spell.damage * 5,
  periodic: true,
}))

const incise = bossSpell(1237267, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const lightBoltVolley = trashSpell(1301834, { aoe: true })

const verdantStomp = bossSpell(1236746, { aoe: true })

const uproot = trashSpell(1255205, { aoe: true })

const fertileLoam = bossSpell(1234802, (spell) => ({
  damage: spell.damage * 3,
  periodic: true,
}))

const lightBolt = bossSpell(1238063)

const seedShot = trashSpell(1238232)

const concentratedLightbeam = bossSpell(1246751, (spell) => ({
  damage: spell.damage * 3,
  periodic: true,
}))

const rupturedEarth = trashSpell(1237858, (spell) => ({
  damage: spell.damage * 2,
  periodic: true,
}))

const fluorescentOutburst = bossSpell(1247039, { aoe: true })

const lightscorchedEarth = bossSpell(1235828)

const spoutingFloret = trashSpell(1263628, { aoe: true })

export const valeAbilities = [
  sporeSpines,
  grievousGash,
  thornspike,
  earthruptureStrike,
  lightfireBeams,
  lightfire,
  bedrockSurge,
  lightblossomBeam,
  lightwardensBlight,
  bedrockSlam,
  tongueToss,
  grievousThrash,
  huntingLeap,
  thornblade,
  incise,
  lightBoltVolley,
  verdantStomp,
  uproot,
  fertileLoam,
  lightBolt,
  seedShot,
  concentratedLightbeam,
  rupturedEarth,
  fluorescentOutburst,
  lightscorchedEarth,
  spoutingFloret,
]
