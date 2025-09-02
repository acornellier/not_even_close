import { bossSpell, trashSpell } from '../grimoire.ts'

const wickedBolt = trashSpell(326829, {
  avoidable: true,
})

const curseOfObliteration = trashSpell(325879)

const thrash = trashSpell(326426, (spell) => ({
  damage: spell.damage * 9,
  periodic: true,
}))

const disruptingScreech = trashSpell(1235326)

const stoneShatteringLeap = bossSpell(319592)

const telekineticOnslaught = bossSpell(1237642, (spell) => ({
  name: `${spell.name} x4`,
  damage: spell.damage * 4,
  ignoresArmor: true,
}))

export const hoaAbilities = [
  wickedBolt,
  curseOfObliteration,
  thrash,
  disruptingScreech,
  stoneShatteringLeap,
  telekineticOnslaught,
]
