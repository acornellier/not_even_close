import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const serratedCharge = trashSpell(1291399, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const slitherStrike = trashSpell(1295635, (spell) => ({
  damage: spell.damage * 12,
  periodic: true,
}))

const sunderSlam = trashSpell(1291468, { tankOnly: true })

const lightningBolt = trashSpell(1291262)

const groundPound = trashSpell(265966, { aoe: true })

const gust = bossSpell(1288457, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const thunderAndLightning = bossSpell(1288092, { aoe: true })

const overload = bossSpell(1288428, () => ({
  damage: scalingTickingDamage(1, 15),
  aoe: true,
}))

const volley = trashSpell(273225, { aoe: true })

const headButt = trashSpell(272654, { tankOnly: true })

const serpentsStormcall = trashSpell(1310402, () => ({
  damage: scalingTickingDamage(1, 12),
  tankOnly: true,
}))

const lingeringStorm = bossSpell(1293133, (spell) => ({
  damage: spell.damage * 2,
  periodic: true,
}))

const venomBolt = trashSpell(1310683)

const lightningBite = bossSpell(1290797, (spell) => ({
  damage: spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const serpentstorm = bossSpell(1293048, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const poisonSpit = trashSpell(267027, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (8s); players typically took 1 of 8 ticks.',
  periodic: true,
}))

const releaseCharge = trashSpell(1293475, { aoe: true })

const imbuedConduction = trashSpell(1296052, (spell) => ({
  damage: spell.periodicDamage,
  notes: 'Assumes full duration (20s); players typically took 2 of 20 ticks.',
  periodic: true,
}))

const induction = bossSpell(1290531, { aoe: true })

const inductionField = bossSpell(1291815, (spell) => ({
  damage: spell.damage * 2,
  periodic: true,
}))

const looseSparks = trashSpell(267483)

const lightningSpire = bossSpell(1291598, { aoe: true })

const siphonEnergy = trashSpell(1303596, (spell) => ({
  damage: spell.damage * 15,
  periodic: true,
}))

const venomousSlash = trashSpell(1303443, (spell) => ({
  damage: spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const causticStomp = trashSpell(1303486, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const hexMuck = bossSpell(1300684)

const latentHex1311981 = bossSpell(1311981, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const taintedStrike = trashSpell(1300803, (spell) => ({
  damage: spell.damage * 11,
  tankOnly: true,
  periodic: true,
}))

const vileCharge = trashSpell(1302618, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const latentHex = bossSpell(1302153, () => ({
  damage: scalingTickingDamage(5, 5),
  periodic: true,
}))

const latentHex1311979 = bossSpell(1311979, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const corruptionBurst = trashSpell(1302826, { aoe: true })

const unstableCorruption = trashSpell(1302761, { aoe: true })

export const tosAbilities = [
  serratedCharge,
  slitherStrike,
  sunderSlam,
  lightningBolt,
  groundPound,
  gust,
  thunderAndLightning,
  overload,
  volley,
  headButt,
  serpentsStormcall,
  lingeringStorm,
  venomBolt,
  lightningBite,
  serpentstorm,
  poisonSpit,
  releaseCharge,
  imbuedConduction,
  induction,
  inductionField,
  looseSparks,
  lightningSpire,
  siphonEnergy,
  venomousSlash,
  causticStomp,
  hexMuck,
  latentHex1311981,
  taintedStrike,
  vileCharge,
  latentHex,
  latentHex1311979,
  corruptionBurst,
  unstableCorruption,
]
