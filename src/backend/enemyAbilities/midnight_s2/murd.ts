import { bossSpell, trashSpell } from '../grimoire.ts'

const cutpurse = trashSpell(1216300, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const glaiveToss = trashSpell(1295035, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const shieldBash = trashSpell(1216529, { tankOnly: true })

const heartstopPoison = bossSpell(1216590, (spell) => ({
  damage: spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const felDetonation = trashSpell(1216538, { avoidable: true, aoe: true })

const corrodingSpittle1217633 = trashSpell(1217633, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (15s); players typically took 0 of 5 ticks.',
  periodic: true,
}))

const chaosBarrage = bossSpell(1230298)

const corrodingSpittle = trashSpell(1228198, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (30s); players typically took 0 of 10 ticks.',
  periodic: true,
}))

const sharpNail = trashSpell(1311136, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const heartstopPoison474515 = bossSpell(474515, (spell) => ({
  damage: spell.periodicDamage,
  notes: 'Assumes full duration (15s); players typically took 2 of 15 ticks.',
  tankOnly: true,
  periodic: true,
}))

const envenom = bossSpell(1223939, { tankOnly: true })

const doomBolt = trashSpell(1258420, { avoidable: true })

const axeToss = bossSpell(1214663, { aoe: true })

const felLightning = trashSpell(1214650, (spell) => ({
  damage: spell.damage * 12,
  periodic: true,
}))

const infernalCrush = bossSpell(1295455, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  avoidable: true,
  periodic: true,
  aoe: true,
}))

const demonicRage = bossSpell(474197, { aoe: true })

const burningSteps = bossSpell(474234, (spell) => ({
  damage: spell.damage * 2,
  avoidable: true,
  periodic: true,
}))

const defiledSlam = trashSpell(1294827, { aoe: true })

const chaosBolt = bossSpell(474375, { avoidable: true })

export const murdAbilities = [
  cutpurse,
  glaiveToss,
  shieldBash,
  heartstopPoison,
  felDetonation,
  corrodingSpittle1217633,
  chaosBarrage,
  corrodingSpittle,
  sharpNail,
  heartstopPoison474515,
  envenom,
  doomBolt,
  axeToss,
  felLightning,
  infernalCrush,
  demonicRage,
  burningSteps,
  defiledSlam,
  chaosBolt,
]
