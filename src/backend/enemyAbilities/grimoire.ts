import { EnemyAbility } from './enemies'
import { getGrimoireSpell } from 'grimoire-wow'
import { grimoireToEnemyAbility } from './grimoireConverter.ts'

type Overrides =
  | Partial<EnemyAbility>
  | ((baseAbility: EnemyAbility) => Partial<EnemyAbility>)

function getEnemySpell(
  spellId: number,
  season: 's3' | 's4',
  overrides?: Overrides,
): EnemyAbility {
  const spell = getGrimoireSpell(spellId)
  const baseSpell = grimoireToEnemyAbility(spell, season)

  return {
    ...baseSpell,
    ...((overrides && typeof overrides === 'function'
      ? overrides(baseSpell)
      : overrides) || {}),
  }
}

export const getEnemySpellS3 = (spellId: number, overrides?: Overrides) =>
  getEnemySpell(spellId, 's3', overrides)
export const getEnemySpellS4 = (spellId: number, overrides?: Overrides) =>
  getEnemySpell(spellId, 's4', overrides)
