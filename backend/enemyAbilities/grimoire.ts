import { EnemyAbility } from './enemies'
import { getGrimoireSpell, initGrimoire } from 'grimoire-wow'

import 'grimoire-wow/dist/spells.json'

initGrimoire(process.cwd() + '/node_modules/grimoire-wow/dist/spells.json')

type Overrides =
  | Partial<EnemyAbility>
  | ((baseAbility: EnemyAbility) => Partial<EnemyAbility>)

function getEnemySpell(
  spellId: number,
  season: 's3' | 's4',
  overrides?: Overrides,
): EnemyAbility {
  const spell = getGrimoireSpell(spellId)
  const baseSpell: EnemyAbility = {
    name: spell.name,
    id: spell.id,
    icon: spell.icon,
    damage: spell.damage?.[season] ?? 0,
    aoe: !!spell.aoe,
    physical: !!spell.physical,
    variance: (spell.variance ?? 0) / 2,
  }

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
