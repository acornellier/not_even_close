﻿import { dhtAbilities } from './enemyAbilities/dht'
import { adAbilities } from './enemyAbilities/ad'
import { brhAbilities } from './enemyAbilities/brh'
import { tottAbilities } from './enemyAbilities/tott'
import { wcmAbilities } from './enemyAbilities/wcm'
import { dotiAbilites } from './enemyAbilities/doti'
import { ebAbilities } from './enemyAbilities/eb'
import { EnemyAbilityDetails } from './sim/simTypes'
import { aaAbilities } from './enemyAbilities/s4/aa'
import { nokAbilities } from './enemyAbilities/s4/nok'

export type TimeBetweenCasts = number | [number, number]

export type EnemyAbility = Omit<EnemyAbilityDetails, 'damage'> & {
  name: string
  spellId?: number
  iconName: string
  baseDamage: number
  variance?: number
  timeBetweenCasts?: TimeBetweenCasts
  notOneShot?: boolean
  wowheadLink?: string
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
  'brh',
  'dht',
  'doti',
  'ad',
  'eb',
  'tott',
  'wcm',
  'all_s3',
] as const

export type DungeonKey = typeof dungeonKeys[number]

export const isSeason4 = (key: DungeonKey) =>
  ['aa', 'av', 'bh', 'hoi', 'nelth', 'nok', 'rlp', 'uld', 'all_s4'].includes(key)

export type Dungeon = {
  key: DungeonKey
  name: string
  abilities: EnemyAbility[]
  icon: string
}

export const dungeons: Dungeon[] = [
  {
    key: 'aa',
    name: 'Algethar Academy',
    abilities: aaAbilities,
    icon: 'achievement_dungeon_dragonacademy',
  },
  {
    key: 'nok',
    name: 'Nokhud Offensive',
    abilities: nokAbilities,
    icon: 'achievement_dungeon_centaurplains',
  },
  {
    key: 'ad',
    name: "Atal'Dazar",
    abilities: adAbilities,
    icon: 'achievement_dungeon_ataldazar',
  },
  {
    key: 'brh',
    name: 'Black Rook Hold',
    abilities: brhAbilities,
    icon: 'achievement_dungeon_blackrookhold',
  },
  {
    key: 'dht',
    name: 'Darkheart Thicket',
    abilities: dhtAbilities,
    icon: 'achievement_dungeon_darkheartthicket',
  },
  {
    key: 'doti',
    name: 'Dawn of the Infinite',
    abilities: dotiAbilites,
    icon: 'achievement_dungeon_dawnoftheinfinite',
  },
  {
    key: 'eb',
    name: 'Everbloom',
    abilities: ebAbilities,
    icon: 'achievement_dungeon_everbloom',
  },
  {
    key: 'tott',
    name: 'Throne of the Tides',
    abilities: tottAbilities,
    icon: 'achievement_dungeon_throne-of-the-tides',
  },
  {
    key: 'wcm',
    name: 'Waycrest Manor',
    abilities: wcmAbilities,
    icon: 'achievement_dungeon_waycrestmannor',
  },
]

dungeons.push({
  key: 'all_s3',
  name: 'All dungeons',
  abilities: dungeons
    .filter(({ key }) => !isSeason4(key))
    .flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

dungeons.push({
  key: 'all_s4',
  name: 'All dungeons',
  abilities: dungeons
    .filter(({ key }) => !isSeason4(key))
    .flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

export const dungeonsByKey = dungeons.reduce((acc, dungeon) => {
  acc[dungeon.key] = dungeon
  return acc
}, {} as Record<DungeonKey, Dungeon>)
