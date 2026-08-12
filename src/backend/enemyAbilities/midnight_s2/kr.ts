import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const shadowWhirlwind = trashSpell(1305945, { aoe: true })

const shadowfrostBolt = trashSpell(1294815, { avoidable: true })

const necroticEnergy = trashSpell(1310758, { avoidable: true, aoe: true })

const tailThrash = bossSpell(265910, { tankOnly: true })

const serpentineGust265781 = bossSpell(265781, { aoe: true })

const suddenRupture = trashSpell(1297781, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const mortalBleed = trashSpell(1297918, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const bloodDrain = trashSpell(1297970, () => ({
  damage: scalingTickingDamage(1, 16),
  aoe: true,
}))

const bladestorm = trashSpell(270928, { avoidable: true, aoe: true })

const huntingLeap270503 = bossSpell(270503, { aoe: true })

const soulBolt = trashSpell(1294972, { avoidable: true })

const purificationStrike = trashSpell(270293, { aoe: true })

const putridSeekers = trashSpell(1298104, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  notes: 'Assumes full duration (12s); players typically took 1 of 13 ticks.',
  avoidable: true,
  periodic: true,
  aoe: true,
}))

const embalm = trashSpell(1312569, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
}))

const awakeningSlam = bossSpell(1312146, { aoe: true })

const spectralBolt = trashSpell(1295125, { avoidable: true })

const bloodthirstyAxe = trashSpell(1301851, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const soulCrush = trashSpell(1302028, { tankOnly: true })

const whirlingAxe = trashSpell(266191, (spell) => ({
  damage: spell.periodicDamage,
  avoidable: true,
  periodic: true,
}))

const severingAxe = trashSpell(266231, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const arcLightning = trashSpell(1305810)

const torrent = trashSpell(267105, { avoidable: true, aoe: true })

const shadowBarrage = trashSpell(272388, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const huntingLeap = bossSpell(1303039, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const bladeCombo268591 = bossSpell(268591, () => ({
  damage: scalingTickingDamage(1, 114),
  tankOnly: true,
}))

const bladeCombo268590 = bossSpell(268590, () => ({
  damage: scalingTickingDamage(1, 87),
  tankOnly: true,
}))

const bladeCombo268589 = bossSpell(268589, () => ({
  damage: scalingTickingDamage(1, 65),
  tankOnly: true,
}))

const gildedDestruction = bossSpell(1303267, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const searingGold = bossSpell(1303374, { avoidable: true, aoe: true })

const bladeCombo = bossSpell(268587, () => ({
  damage: scalingTickingDamage(1, 59),
  tankOnly: true,
}))

const impalingSpear = bossSpell(1302945, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  avoidable: true,
  periodic: true,
  aoe: true,
}))

const savageMaul = bossSpell(1303490, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

export const krAbilities = [
  shadowWhirlwind,
  shadowfrostBolt,
  necroticEnergy,
  tailThrash,
  serpentineGust265781,
  suddenRupture,
  mortalBleed,
  bloodDrain,
  bladestorm,
  huntingLeap270503,
  soulBolt,
  purificationStrike,
  putridSeekers,
  embalm,
  awakeningSlam,
  spectralBolt,
  bloodthirstyAxe,
  soulCrush,
  whirlingAxe,
  severingAxe,
  arcLightning,
  torrent,
  shadowBarrage,
  huntingLeap,
  bladeCombo268591,
  bladeCombo268590,
  bladeCombo268589,
  gildedDestruction,
  searingGold,
  bladeCombo,
  impalingSpear,
  savageMaul,
]
