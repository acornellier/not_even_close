import { bossSpell, trashSpell } from '../grimoire.ts'

const overpoweringRoar = trashSpell(428066, {
  ignoresArmor: true,
})

const throwRock = trashSpell(428089)

const quenchingBlast = trashSpell(430171)

const dousingBreath = bossSpell(425394)

const massiveStomp = trashSpell(1218117, {
  outrange: 50,
})

const shadowblast = bossSpell(427011)

const eternalDarkness = bossSpell(428276, (spell) => ({
  damage: spell.damage * 4,
  periodic: true,
}))

export const dcAbilities = [
  overpoweringRoar,
  throwRock,
  quenchingBlast,
  dousingBreath,
  massiveStomp,
  shadowblast,
  eternalDarkness,
]
