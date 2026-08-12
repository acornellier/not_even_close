import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const ravenousClaws = trashSpell(1306338, () => ({
  damage: scalingTickingDamage(1, 13),
  tankOnly: true,
}))

const duostrike = trashSpell(1294572, () => ({
  damage: scalingTickingDamage(1, 21),
  tankOnly: true,
}))

const paralyzingShots = trashSpell(1307269, (spell) => ({
  damage: spell.damage * 3,
  periodic: true,
}))

const dismember = trashSpell(1306911, { tankOnly: true })

const bloodSacrifice = trashSpell(1306641)

const piercingHiss = trashSpell(1294557, { aoe: true })

const toxicBreath = trashSpell(1306669, (spell) => ({
  damage: spell.damage * 5,
  avoidable: true,
  periodic: true,
}))

const ravenousStomp = bossSpell(1307894, { aoe: true })

const hydrastrike = bossSpell(1298683, () => ({
  damage: scalingTickingDamage(1, 45),
  tankOnly: true,
}))

const tripleShot1297876 = bossSpell(1297876)

const carrionBurst = bossSpell(1307700, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const messyEater = bossSpell(1306345, { avoidable: true, aoe: true })

const corrosiveFangs = trashSpell(1294845, { tankOnly: true })

const synchronizedVenom = bossSpell(1299189, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const tailScythe = bossSpell(1298949, { tankOnly: true })

const uncoil = bossSpell(1287811, { aoe: true })

const toxicAtrophy = bossSpell(1310974, { aoe: true })

const lacedEdge = trashSpell(1308518, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const noxiousSpray = trashSpell(1294958, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
}))

const chopDown = bossSpell(1301353, { tankOnly: true })

const boneslicer = bossSpell(1301508, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  avoidable: true,
  periodic: true,
}))

const envenom = trashSpell(1307571, (spell) => ({
  damage: spell.damage * 7,
  periodic: true,
}))

export const fangAbilities = [
  ravenousClaws,
  duostrike,
  paralyzingShots,
  dismember,
  bloodSacrifice,
  piercingHiss,
  toxicBreath,
  ravenousStomp,
  hydrastrike,
  tripleShot1297876,
  carrionBurst,
  messyEater,
  corrosiveFangs,
  synchronizedVenom,
  tailScythe,
  uncoil,
  toxicAtrophy,
  lacedEdge,
  noxiousSpray,
  chopDown,
  boneslicer,
  envenom,
]
