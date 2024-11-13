import type { EnemyAbility } from './enemies'
import { getGrimoireSpell } from 'grimoire-wow'
import { grimoireToEnemyAbility } from './grimoireConverter.ts'

type Options =
  | Partial<EnemyAbility>
  | ((baseAbility: EnemyAbility) => Partial<EnemyAbility>)

export function getEnemySpell(
  spellId: number,
  options?: Options,
  extraOptions?: { effectIndex?: number },
  trashAbility?: boolean,
): EnemyAbility {
  const spell = getGrimoireSpell(spellId)
  const baseSpell = grimoireToEnemyAbility(spell, extraOptions?.effectIndex ?? 0)

  return {
    ...baseSpell,
    ...((options && typeof options === 'function' ? options(baseSpell) : options) || {}),
    ...(trashAbility ? { trashAbility: true } : {}),
  }
}

export function trashSpell(
  spellId: number,
  options?: Options,
  extraOptions?: { effectIndex?: number },
): EnemyAbility {
  return getEnemySpell(spellId, options, extraOptions, true)
}
