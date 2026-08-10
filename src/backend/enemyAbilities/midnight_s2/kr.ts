import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const bladeCombo = bossSpell(268587, () => ({
  damage: scalingTickingDamage(4, 35),
  tankOnly: true,
  periodic: true,
}))

const bladestorm = trashSpell(270928, { aoe: true })

const soulCrush = trashSpell(1302028, { tankOnly: true })

const putridSeekers = trashSpell(1298104, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (12s); players typically took 1 of 13 ticks.',
  periodic: true,
  aoe: true,
}))

const tailThrash = bossSpell(265910, { tankOnly: true })

const mortalBleed = trashSpell(1297918, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const impalingSpear = bossSpell(1302945, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const serpentineGust = bossSpell(1311988, { aoe: true })

const whirlingAxe = trashSpell(266191, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const severingAxe = trashSpell(266231, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const necroticEnergy = trashSpell(1310758, { aoe: true })

const gildedDestruction = bossSpell(1303267, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const savageMaul = bossSpell(1303490, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const spectralBolt = trashSpell(1295125)

const suddenRupture = trashSpell(1297781, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const awakeningSlam = bossSpell(1312146, { aoe: true })

const purificationStrike = trashSpell(270293, { aoe: true })

const bloodthirstyAxe = trashSpell(1301851, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const shadowWhirlwind = trashSpell(1305945, { aoe: true })

const bloodDrain = trashSpell(1297970, () => ({
  damage: scalingTickingDamage(1, 16),
  aoe: true,
}))

const embalm = trashSpell(1312569, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const torrent = trashSpell(267105, { aoe: true })

const shadowBarrage = trashSpell(272388, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const arcLightning = trashSpell(1305810)

const searingGold = bossSpell(1303374, { aoe: true })

const shadowfrostBolt = trashSpell(1294815)

const soulBolt = trashSpell(1294972)

export const krAbilities = [
  bladeCombo,
  bladestorm,
  soulCrush,
  putridSeekers,
  tailThrash,
  mortalBleed,
  impalingSpear,
  serpentineGust,
  whirlingAxe,
  severingAxe,
  necroticEnergy,
  gildedDestruction,
  savageMaul,
  spectralBolt,
  suddenRupture,
  awakeningSlam,
  purificationStrike,
  bloodthirstyAxe,
  shadowWhirlwind,
  bloodDrain,
  embalm,
  torrent,
  shadowBarrage,
  arcLightning,
  searingGold,
  shadowfrostBolt,
  soulBolt,
]
