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

const paralyzingShots = trashSpell(1307269, { notes: 'Initial hit only.' })

const dismember = trashSpell(1306911, { tankOnly: true })

const bloodSacrifice = trashSpell(1306641)

const ravenousStomp = bossSpell(1307894, { aoe: true })

const hydrastrike = bossSpell(1298683, () => ({
  damage: scalingTickingDamage(1, 45),
  tankOnly: true,
}))

const tripleShot1297876 = bossSpell(1297876)

const messyEater = bossSpell(1306345, { aoe: true })

const corrosiveFangs = trashSpell(1294845, { tankOnly: true })

const rattle = trashSpell(1294859, (spell) => ({
  damage: spell.damage * 6,
  ignoresArmor: true,
  periodic: true,
  aoe: true,
}))

const tailScythe = bossSpell(1298949, { tankOnly: true })

const uncoil = bossSpell(1287811, { aoe: true })

const chopDown = bossSpell(1301353, { tankOnly: true })

const boneslicer = bossSpell(1301508, { notes: 'Initial hit only.' })

export const fangAbilities = [
  ravenousClaws,
  duostrike,
  paralyzingShots,
  dismember,
  bloodSacrifice,
  ravenousStomp,
  hydrastrike,
  tripleShot1297876,
  messyEater,
  corrosiveFangs,
  rattle,
  tailScythe,
  uncoil,
  chopDown,
  boneslicer,
]
