import { bossSpell, trashSpell } from '../grimoire.ts'

const shieldBash = trashSpell(1216529, { tankOnly: true })

const felLightning = trashSpell(1214650, (spell) => ({
  damage: spell.damage * 12,
  periodic: true,
}))

const infernalCrush = bossSpell(1295455, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const envenom = trashSpell(1223939, { tankOnly: true })

const cutpurse = trashSpell(1216300, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const burningSteps = bossSpell(474234, (spell) => ({
  damage: spell.damage * 2,
  periodic: true,
}))

const felDetonation = trashSpell(1216538, { aoe: true })

const corrodingSpittle = trashSpell(1228198, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (30s); players typically took 0 of 10 ticks.',
  periodic: true,
}))

const demonicRage = bossSpell(474197, { aoe: true })

const chaosBarrage = bossSpell(1230298)

const axeToss = bossSpell(1214663, { aoe: true })

const defiledSlam = trashSpell(1294827, { aoe: true })

const sharpNail = trashSpell(1311136, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const chaosBolt = bossSpell(474375)

const glaiveToss = trashSpell(1295035, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const doomBolt = trashSpell(1258420)

export const murdAbilities = [
  shieldBash,
  felLightning,
  infernalCrush,
  envenom,
  cutpurse,
  burningSteps,
  felDetonation,
  corrodingSpittle,
  demonicRage,
  chaosBarrage,
  axeToss,
  defiledSlam,
  sharpNail,
  chaosBolt,
  glaiveToss,
  doomBolt,
]
