import { getEnemySpell } from '../grimoire.ts'

const alertingShrill = getEnemySpell(438495, (spell) => ({
  damage: spell.damage * 7,
  periodic: true,
}))

const cosmicSingularity = getEnemySpell(432117, {
  avoidable: true,
})

const callOfTheBrood = getEnemySpell(438879, (spell) => ({
  damage: spell.damage * 3,
  trashAbility: true,
}))

const massiveSlam = getEnemySpell(434252, {
  trashAbility: true,
})

export const akAbilities = [
  alertingShrill,
  cosmicSingularity,
  callOfTheBrood,
  massiveSlam,
]
