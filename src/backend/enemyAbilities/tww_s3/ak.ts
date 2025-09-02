import { getEnemySpell } from '../grimoire.ts'

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

export const akAbilities = [alertingShrill, gossamerOnslaught]
