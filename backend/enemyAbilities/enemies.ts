import { EnemyAbilityDetails } from '../sim/simTypes'

export type TimeBetweenCasts = number | [number, number]

export type Counterplay = {
  combatDrop?: 'recast' | 'cancel'
  los?: boolean
  outrange?: number
  spellReflect?: boolean
  diffuse?: boolean
}

export type EnemyAbility = Omit<EnemyAbilityDetails, 'damage'> & {
  name: string
  id?: number
  icon: string
  damage: number
  variance?: number
  cooldown?: TimeBetweenCasts
  periodic?: boolean
  avoidable?: boolean
  notes?: string
  wowheadLink?: string
  counterplay?: Counterplay
}

export const dungeonKeys = [
  'aa',
  'av',
  'bh',
  'hoi',
  'nelth',
  'nok',
  'rlp',
  'uld',
  'all_s4',
  // s3
  'brh',
  'dht',
  'doti',
  'ad',
  'eb',
  'tott',
  'wcm',
  'all_s3',
] as const

export type DungeonKey = (typeof dungeonKeys)[number]

export const isSeason4 = (key: DungeonKey) =>
  ['aa', 'av', 'bh', 'hoi', 'nelth', 'nok', 'rlp', 'uld', 'all_s4'].includes(key)

export type Dungeon = {
  key: DungeonKey
  name: string
  abilities: EnemyAbility[]
  icon: string
}
