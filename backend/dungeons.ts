import { dhtAbilities } from './enemyAbilities/dht'
import { adAbilities } from './enemyAbilities/ad'
import { brhAbilities } from './enemyAbilities/brh'
import { tottAbilities } from './enemyAbilities/tott'
import { wcmAbilities } from './enemyAbilities/wcm'
import { dotiAbilites } from './enemyAbilities/doti'
import { ebAbilities } from './enemyAbilities/eb'
import { EnemyAbilityDetails } from './sim/simTypes'
import { aaAbilities } from './enemyAbilities/s4/aa'
import { nokAbilities } from './enemyAbilities/s4/nok'
import { avAbilities } from './enemyAbilities/s4/av'
import { bhAbilities } from './enemyAbilities/s4/bh'
import { hoiAbilities } from './enemyAbilities/s4/hoi'
import { nelthAbilities } from './enemyAbilities/s4/nelth'
import { uldAbilities } from './enemyAbilities/s4/uld'
import { rlpSpells } from './enemyAbilities/s4/rlp'

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
  baseDamage: number
  variance?: number
  timeBetweenCasts?: TimeBetweenCasts
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
    key: 'av',
    name: 'Azure Vault',
    abilities: avAbilities,
    icon: 'achievement_dungeon_arcanevaults',
  },
  {
    key: 'bh',
    name: 'Brackenhide Hollow',
    abilities: bhAbilities,
    icon: 'achievement_dungeon_brackenhidehollow',
  },
  {
    key: 'hoi',
    name: 'Halls of Infusion',
    abilities: hoiAbilities,
    icon: 'achievement_dungeon_hallsofinfusion',
  },
  {
    key: 'nelth',
    name: 'Neltharus',
    abilities: nelthAbilities,
    icon: 'achievement_dungeon_neltharus',
  },
  {
    key: 'nok',
    name: 'Nokhud Offensive',
    abilities: nokAbilities,
    icon: 'achievement_dungeon_centaurplains',
  },
  {
    key: 'rlp',
    name: 'Ruby Life Pools',
    abilities: rlpSpells,
    icon: 'achievement_dungeon_lifepools',
  },
  {
    key: 'uld',
    name: 'Uldaman',
    abilities: uldAbilities,
    icon: 'achievement_dungeon_uldaman',
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
    .filter(({ key }) => isSeason4(key))
    .flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

export const dungeonsByKey = dungeons.reduce((acc, dungeon) => {
  acc[dungeon.key] = dungeon
  return acc
}, {} as Record<DungeonKey, Dungeon>)
