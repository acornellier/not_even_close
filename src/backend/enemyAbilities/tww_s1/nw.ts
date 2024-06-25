import { getEnemySpell } from '../grimoire.ts'

const grimFate = getEnemySpell(327397, {
  trashAbility: true,
})

const heavingWretch = getEnemySpell(320596)

export const nwAbilities = [grimFate, heavingWretch]
