import { bossSpell, trashSpell } from '../grimoire.ts'

const overpoweringRoar = trashSpell(428066, {
  ignoresArmor: true,
})

const throwRock = trashSpell(428089)

const dousingBreath = bossSpell(425394)

const massiveStomp = trashSpell(1218117, {
  outrange: 50,
})

const shadowblast = bossSpell(427011)

export const dcAbilities = [
  overpoweringRoar,
  throwRock,
  dousingBreath,
  massiveStomp,
  shadowblast,
]
