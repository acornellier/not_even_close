import type { EnemyAbility } from './enemies.ts'
import type { GrimoireSpell } from 'grimoire-wow'

export function grimoireToEnemyAbility(
  spell: GrimoireSpell,
  index: number,
): EnemyAbility {
  const effect = spell.effects?.[index]

  return {
    id: spell.id,
    name: spell.name,
    icon: spell.icon,
    damage: effect?.damage ?? 0,
    aoe: effect?.aoe ?? false,
    physical: spell.schools && spell.schools[0] === 'physical',
    schools: spell.schools ?? [],
    variance: (effect?.variance ?? 0) / 2,
  }
}
