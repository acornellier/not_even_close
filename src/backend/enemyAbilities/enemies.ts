import type { EnemyAbilityDetails } from '../sim/simTypes'

export type TimeBetweenCasts = number | [number, number]

export type EnemyAbility = Omit<EnemyAbilityDetails, 'damage'> & {
  id: number
  name: string
  icon: string
  damage: number
  aoeMultiplier?: number
  variance?: number
  cooldown?: TimeBetweenCasts
  periodic?: boolean
  /**
   * Full-duration total of the spell's periodic effect, from grimoire; 0 when it has no DoT.
   * Always set by grimoireToEnemyAbility, so ability files can add it without a null check.
   */
  periodicDamage: number
  /** DBC tick count of the periodic effect, including a tick-on-apply one. 0 when not periodic. */
  ticks: number
  avoidable?: boolean
  tankOnly?: boolean

  // counterplay
  combatDrop?: 'recast' | 'cancel'
  los?: boolean
  outrange?: number
  spellReflect?: boolean
  diffuse?: boolean

  notes?: string
}

export const dungeonKeys = [
  'murd',
  'nalo',
  'vale',
  'void',
  'fang',
  'rlp',
  'tos',
  'kr',
  'all_dungeons',
] as const

export type DungeonKey = (typeof dungeonKeys)[number]

export type Dungeon = {
  key: DungeonKey
  name: string
  abilities: EnemyAbility[]
  icon: string
}
