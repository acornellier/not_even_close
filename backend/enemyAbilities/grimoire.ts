// import 'server-only'

import { EnemyAbility } from './enemies'
import { getGrimoireSpell, initGrimoire } from 'grimoire-wow'

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
  const baseSpell = {
    name: spell.name,
    id: spell.id,
    icon: spell.icon,
    baseDamage: spell.damage[season],
    aoe: spell.aoe,
    physical: spell.physical,
    variance: spell.variance / 2,
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
