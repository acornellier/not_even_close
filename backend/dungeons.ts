import { dhtAbilities } from './enemyAbilities/dht'
import { adAbilities } from './enemyAbilities/ad'
import { brhAbilities } from './enemyAbilities/brh'
import { tottAbilities } from './enemyAbilities/tott'
import { wcmAbilities } from './enemyAbilities/wcm'
import { dotiAbilites } from './enemyAbilities/doti'
import { ebAbilities } from './enemyAbilities/eb'

import { EnemyAbilityDetails } from './sim/simTypes'

export const dungeons = [
  "Atal'Dazar",
  'Black Rook Hold',
  'Darkheart Thicket',
  'Dawn of the Infinite',
  'Everbloom',
  'Throne of the Tides',
  'Waycrest Manor',
  'All dungeons',
] as const

export type Dungeon = typeof dungeons[number]

export type EnemyAbility = Omit<EnemyAbilityDetails, 'damage'> & {
  name: string
  baseDamage: number
  variance?: number
  boss?: string
  dungeon: Dungeon
  iconName: string
  wowheadLink: string
}

export const dungeonAbilities: Record<Dungeon, EnemyAbility[]> = {
  "Atal'Dazar": adAbilities,
  'Black Rook Hold': brhAbilities,
  'Darkheart Thicket': dhtAbilities,
  'Dawn of the Infinite': dotiAbilites,
  Everbloom: ebAbilities,
  'Throne of the Tides': tottAbilities,
  'Waycrest Manor': wcmAbilities,
  'All dungeons': [
    ...adAbilities,
    ...brhAbilities,
    ...dhtAbilities,
    ...dotiAbilites,
    ...ebAbilities,
    ...tottAbilities,
    ...wcmAbilities,
  ],
}

export const dungeonIcons: Record<Dungeon, string> = {
  "Atal'Dazar": 'achievement_dungeon_ataldazar',
  'Black Rook Hold': 'achievement_dungeon_blackrookhold',
  'Darkheart Thicket': 'achievement_dungeon_darkheartthicket',
  'Dawn of the Infinite': 'achievement_dungeon_dawnoftheinfinite',
  Everbloom: 'achievement_dungeon_everbloom',
  'Throne of the Tides': 'achievement_dungeon_throne-of-the-tides',
  'Waycrest Manor': 'achievement_dungeon_waycrestmannor',
  'All dungeons': 'achievement_challengemode_arakkoaspires_gold',
}
