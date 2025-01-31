import { bossSpell, trashSpell } from '../grimoire.ts'

const mightySmash = bossSpell(1215741, {
  cooldown: 40,
})

const soulstorm = trashSpell(330720, {
  damage: trashSpell(330720).damage * 5,
  periodic: true,
})

const jaggedQuarrel = trashSpell(330532)

const earthCrusher = trashSpell(1215850, {
  ignoresArmor: true,
})

const interruptingRoar = trashSpell(342135, {
  ignoresArmor: true,
  cooldown: 10,
})

const seismicStomp = trashSpell(333827, {
  ignoresArmor: true,
  cooldown: 10,
  outrange: 60,
})

const ricochetingBlade = trashSpell(333861, {
  cooldown: 10,
})

const seismicLeap = bossSpell(320789, {
  ignoresArmor: true,
  cooldown: [30, 35],
})

const leapingThrash = bossSpell(323110)

const reapingScythePhys = bossSpell(324424, (spell) => ({
  name: `${spell.name} phys`,
  tankOnly: true,
  notes:
    'This is only the physical damage part of the spell, you will need to check this and its pair separately',
}))

const reapingScytheMagic = bossSpell(324079, (spell) => ({
  name: `${spell.name} magic`,
  tankOnly: true,
  notes:
    'This is only the magic damage part of the spell, you will need to check this and its pair separately',
}))

const echoesOfCarnage = bossSpell(339573)

export const topAbilities = [
  mightySmash,
  soulstorm,
  jaggedQuarrel,
  ricochetingBlade,
  earthCrusher,
  interruptingRoar,
  seismicStomp,
  seismicLeap,
  leapingThrash,
  reapingScythePhys,
  reapingScytheMagic,
  echoesOfCarnage,
]
