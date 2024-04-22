import type { EnemyAbility } from './enemies'
import { getGrimoireSpell } from 'grimoire-wow'
import { grimoireToEnemyAbility } from './grimoireConverter.ts'

type Overrides =
  | Partial<EnemyAbility>
  | ((baseAbility: EnemyAbility) => Partial<EnemyAbility>)

export function getEnemySpell(spellId: number, overrides?: Overrides): EnemyAbility {
  const spell = getGrimoireSpell(spellId)
  const baseSpell = grimoireToEnemyAbility(spell)

  return {
    ...baseSpell,
    ...((overrides && typeof overrides === 'function'
      ? overrides(baseSpell)
      : overrides) || {}),
  }
}
