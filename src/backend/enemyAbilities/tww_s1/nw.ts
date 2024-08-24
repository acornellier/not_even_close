import { getEnemySpell } from '../grimoire.ts'

const grimFate = getEnemySpell(327397, {
  trashAbility: true,
  cooldown: 20,
})

const heavingWretch = getEnemySpell(320596, {
  cooldown: 30,
  combatDrop: 'recast',
})

const spewDisease = getEnemySpell(333479, {
  trashAbility: true,
  cooldown: 12,
  combatDrop: 'recast',
})

const throwFlesh = getEnemySpell(338653, {
  trashAbility: true,
})

export const nwAbilities = [grimFate, heavingWretch, spewDisease, throwFlesh]
