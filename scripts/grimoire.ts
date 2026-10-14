/**
 * Resolves spell ids against grimoire-wow. Script-only: grimoire's spell table is tens of
 * megabytes, so the app never imports it — `yarn write` bakes the values into the dungeon JSON.
 */
import type { EnemyAbility } from '../src/backend/enemyAbilities/enemies.ts'
import { getDamageMultiplier, getGrimoireSpell } from 'grimoire-wow'
import { grimoireToEnemyAbility } from '../src/backend/enemyAbilities/grimoireConverter.ts'

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
  // effectIndex is the DBC EffectIndex; omitting it picks the direct-damage effect.
  const baseSpell = grimoireToEnemyAbility(spell, extraOptions?.effectIndex)

  return {
    ...baseSpell,
    ...((options && typeof options === 'function' ? options(baseSpell) : options) || {}),
    ...(trashAbility ? { trashAbility: true } : {}),
  }
}

export function bossSpell(
  spellId: number,
  options?: Options,
  extraOptions?: { effectIndex?: number },
): EnemyAbility {
  return getEnemySpell(spellId, options, extraOptions, false)
}

export function trashSpell(
  spellId: number,
  options?: Options,
  extraOptions?: { effectIndex?: number },
): EnemyAbility {
  return getEnemySpell(spellId, options, extraOptions, true)
}

export const scalingTickingDamage = (ticks: number, baseDamage: number) =>
  getDamageMultiplier() * baseDamage * ticks
