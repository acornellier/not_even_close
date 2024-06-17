﻿import type { EnemyAbilityDetails } from '../sim/simTypes'

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

export const dungeonKeys = ['cot', 'gb', 'all_tww_s1'] as const

export type DungeonKey = (typeof dungeonKeys)[number]

export type Dungeon = {
  key: DungeonKey
  name: string
  abilities: EnemyAbility[]
  icon: string
}
