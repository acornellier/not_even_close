import type { EnemyAbility } from './enemies.ts'
import type { GrimoireSpell } from 'grimoire-wow'

export function grimoireToEnemyAbility(spell: GrimoireSpell): EnemyAbility {
  return {
    id: spell.id,
    name: spell.name,
    icon: spell.icon,
    damage: spell.damage?.s4 ?? 0,
    aoe: !!spell.aoe,
    physical: !!spell.physical,
    variance: (spell.variance ?? 0) / 2,
  }
}
