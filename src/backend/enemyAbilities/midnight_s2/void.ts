import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const brutalize = trashSpell(1300244, { tankOnly: true })

const ripAndSlice = trashSpell(1311778, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const insidiousAura = trashSpell(1250695, { aoe: true })

const hulkingClaw = bossSpell(1222642, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  tankOnly: true,
  periodic: true,
}))

const corrosiveEssence = trashSpell(1289258, (spell) => ({
  damage: spell.periodicDamage,
  notes: 'Assumes full duration (12s); players typically took 2 of 7 ticks.',
  periodic: true,
}))

const savageLeap = trashSpell(1267894, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const headBash = trashSpell(1245186, { tankOnly: true })

const netherDash = trashSpell(1222103, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const lavaBolt = trashSpell(1228176)

const toxicAura = trashSpell(1222692, (spell) => ({
  damage: spell.damage * 30,
  periodic: true,
}))

const darkBloom = bossSpell(1300259, { aoe: true })

const shredDefense = trashSpell(1233535, { tankOnly: true })

const skyStrike = trashSpell(1239855, { aoe: true })

const cosmicCrash = bossSpell(1300372, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const voidBlast = bossSpell(1297017, { tankOnly: true })

const dreadbellow = trashSpell(1252406, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const mindnumbingPoison = bossSpell(1263971, () => ({
  damage: scalingTickingDamage(10, 4),
  periodic: true,
}))

const monstrousRoar = bossSpell(1262497, { aoe: true })

const unstableSingularity = trashSpell(1264188, (spell) => ({
  damage: spell.damage * 82,
  periodic: true,
}))

const darkBloom1300262 = bossSpell(1300262)

export const voidAbilities = [
  brutalize,
  ripAndSlice,
  insidiousAura,
  hulkingClaw,
  corrosiveEssence,
  savageLeap,
  headBash,
  netherDash,
  lavaBolt,
  toxicAura,
  darkBloom,
  shredDefense,
  skyStrike,
  cosmicCrash,
  voidBlast,
  dreadbellow,
  mindnumbingPoison,
  monstrousRoar,
  unstableSingularity,
  darkBloom1300262,
]
