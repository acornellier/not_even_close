import type { EnemyAbility } from './enemies'
import { getGrimoireSpell } from 'grimoire-wow'
import { grimoireToEnemyAbility } from './grimoireConverter.ts'

type Options = (
  | Partial<EnemyAbility>
  | ((baseAbility: EnemyAbility) => Partial<EnemyAbility>)
) & {
  effectIndex?: number
}

export function getEnemySpell(spellId: number, options?: Options): EnemyAbility {
  const spell = getGrimoireSpell(spellId)
  const baseSpell = grimoireToEnemyAbility(spell, options?.effectIndex ?? 0)

  return {
    ...baseSpell,
    ...((options && typeof options === 'function' ? options(baseSpell) : options) || {}),
  }
}
