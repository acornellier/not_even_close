import { getEnemySpell } from '../grimoire.ts'

const grimFate = getEnemySpell(327397, {
  trashAbility: true,
})

const heavingWretch = getEnemySpell(320596)

const throwFlesh = getEnemySpell(338653, {
  trashAbility: true,
})

export const nwAbilities = [grimFate, heavingWretch, throwFlesh]
