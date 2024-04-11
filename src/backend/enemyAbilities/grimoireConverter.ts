import type { EnemyAbility } from './enemies.ts'
import type { GrimoireSpell } from 'grimoire-wow'

export function grimoireToEnemyAbility(
  spell: GrimoireSpell,
  season: 's3' | 's4',
): EnemyAbility {
  return {
    id: spell.id,
    name: spell.name,
    icon: spell.icon,
    damage: spell.damage?.[season] ?? 0,
    aoe: !!spell.aoe,
    physical: !!spell.physical,
    variance: (spell.variance ?? 0) / 2,
  }
}
