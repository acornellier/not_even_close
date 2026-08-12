import type { EnemyAbility } from './enemies.ts'
import type { GrimoireSpell } from 'grimoire-wow'
import { getDamageMultiplier } from 'grimoire-wow'

/**
 * Pick the effect to read damage from.
 *
 * `effectIndex` is the spell's real DBC EffectIndex, not a position in the array — periodic
 * entries are interleaved by DBC index, so position and index are no longer the same thing.
 *
 * With no explicit index, prefer the direct-damage effect. Grimoire lists a spell's periodic
 * aura first whenever it sits at a lower EffectIndex than the School Damage effect, so taking
 * the first entry would silently return one DoT tick instead of the hit.
 */
function pickEffect(spell: GrimoireSpell, effectIndex?: number) {
  const effects = spell.effects
  if (!effects?.length) return undefined

  if (effectIndex !== undefined) {
    return effects.find((effect) => effect.index === effectIndex)
  }

  return effects.find((effect) => !effect.periodic) ?? effects[0]
}

export function grimoireToEnemyAbility(
  spell: GrimoireSpell,
  effectIndex?: number,
): EnemyAbility {
  const effect = pickEffect(spell, effectIndex)
  const periodicEffect = spell.effects?.find((e) => e.periodic && e.damage > 0)
  const ticks = periodicEffect?.ticks ?? 0

  return {
    id: spell.id,
    name: spell.name,
    icon: spell.icon,
    damage: effect?.damage ?? 0,
    aoe: effect?.aoe ?? false,
    physical: spell.schools && spell.schools[0] === 'physical',
    schools: spell.schools ?? [],
    variance: (effect?.variance ?? 0) / 2,
    // Full-duration total of the spell's periodic effect, so ability files can write
    // `spell.damage + spell.periodicDamage` instead of hardcoding a tick count and a
    // coefficient that only reproduce what grimoire already states. 0 when there's no DoT.
    periodicDamage: (periodicEffect?.damage ?? 0) * ticks,
    ticks,
  }
}

export const scalingTickingDamage = (ticks: number, baseDamage: number) =>
  getDamageMultiplier() * baseDamage * ticks

export const scaledDamage = (baseDamage: number) => getDamageMultiplier() * baseDamage
