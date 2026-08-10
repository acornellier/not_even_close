import { bossSpell, trashSpell } from '../grimoire.ts'
import { scalingTickingDamage } from '../grimoireConverter.ts'

const hydrastrike = bossSpell(1298683, () => ({
  damage: scalingTickingDamage(1, 45),
  tankOnly: true,
}))

const dismember = trashSpell(1306911, { tankOnly: true })

const chopDown = bossSpell(1301353, { tankOnly: true })

const duostrike = trashSpell(1294572, () => ({
  damage: scalingTickingDamage(1, 21),
  tankOnly: true,
}))

const tailScythe = bossSpell(1298949, { tankOnly: true })

const boneslicer = bossSpell(1301508, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const toxicBreath = trashSpell(1306669, (spell) => ({
  damage: spell.damage * 5,
  periodic: true,
}))

const paralyzingShots = trashSpell(1307269, (spell) => ({
  damage: spell.damage * 3,
  periodic: true,
}))

const noxiousSpray = trashSpell(1294958, (spell) => ({
  damage: spell.damage * 6,
  periodic: true,
}))

const envenom = trashSpell(1307571, (spell) => ({
  damage: spell.damage * 7,
  periodic: true,
}))

const synchronizedVenom = bossSpell(1299189, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const carrionBurst = bossSpell(1307700, (spell) => ({
  damage: spell.periodicDamage,
  periodic: true,
  aoe: true,
}))

const lacedEdge = trashSpell(1308518, (spell) => ({
  damage: spell.damage + spell.periodicDamage,
  periodic: true,
}))

const corrosiveFangs = trashSpell(1294845, { tankOnly: true })

const ravenousStomp = bossSpell(1307894, { aoe: true })

const uncoil = bossSpell(1287811, { aoe: true })

const piercingHiss = trashSpell(1294557, { aoe: true })

const messyEater = bossSpell(1306345, { aoe: true })

const toxicAtrophy = bossSpell(1310974, { aoe: true })

const bloodSacrifice = trashSpell(1306641)

const ravenousClaws = trashSpell(1306338, () => ({
  damage: scalingTickingDamage(1, 13),
  tankOnly: true,
}))

const tripleShot1297876 = bossSpell(1297876)

export const fangAbilities = [
  hydrastrike,
  dismember,
  chopDown,
  duostrike,
  tailScythe,
  boneslicer,
  toxicBreath,
  paralyzingShots,
  noxiousSpray,
  envenom,
  synchronizedVenom,
  carrionBurst,
  lacedEdge,
  corrosiveFangs,
  ravenousStomp,
  uncoil,
  piercingHiss,
  messyEater,
  toxicAtrophy,
  bloodSacrifice,
  ravenousClaws,
  tripleShot1297876,
]
