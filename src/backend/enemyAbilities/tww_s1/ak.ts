import { getEnemySpell } from '../grimoire.ts'

const callOfTheBrood = getEnemySpell(438879, (spell) => ({
  damage: spell.damage * 3,
  trashAbility: true,
  cooldown: 30,
  periodic: true,
  ignoresArmor: true,
}))

const alertingShrill = getEnemySpell(438495, (spell) => ({
  damage: spell.damage * 7,
  ignoresArmor: true,
  cooldown: 40,
  periodic: true,
}))

const gossamerOnslaught = getEnemySpell(438960, (spell) => ({
  damage: spell.damage * 6,
  cooldown: 40,
  periodic: true,
}))

const slam = getEnemySpell(465012, {
  trashAbility: true,
  cooldown: 25,
})

export const akAbilities = [alertingShrill, gossamerOnslaught, callOfTheBrood, slam]
