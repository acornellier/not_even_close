import { dhtAbilities } from './enemyAbilities/dht'
import { adAbilities } from './enemyAbilities/ad'
import { brhAbilities } from './enemyAbilities/brh'
import { tottAbilities } from './enemyAbilities/tott'
import { wcmAbilities } from './enemyAbilities/wcm'
import { dotiAbilites } from './enemyAbilities/doti'
import { ebAbilities } from './enemyAbilities/eb'

export type Dungeon =
  | 'Black Rook Hold'
  | "Atal'Dazar"
  | 'Darkheart Thicket'
  | 'Throne of the Tides'
  | 'Waycrest Manor'
  | 'Dawn of the Infinite'
  | 'Everbloom'

export type EnemyAbility = {
  name: string
  boss?: string
  dungeon: Dungeon
  damage: number
  isAoe: boolean
  isTrashAbility?: boolean
  isPhysical?: boolean
  isReducedByArmor?: boolean
  iconName: string
  wowheadLink: string
}

export type DungeonAbilities = {
  dungeon: Dungeon
  abilities: EnemyAbility[]
}
export const enemyAbilities: EnemyAbility[] = [
  ...adAbilities,
  ...brhAbilities,
  ...dhtAbilities,
  ...dotiAbilites,
  ...ebAbilities,
  ...tottAbilities,
  ...wcmAbilities,
]

export const enemyAbilitiesByDungeon: DungeonAbilities[] = enemyAbilities
  .reduce<DungeonAbilities[]>((acc, ability) => {
    let dungeon = acc.find((v) => v.dungeon === ability.dungeon)
    if (!dungeon) {
      dungeon = { dungeon: ability.dungeon, abilities: [] }
      acc.push(dungeon)
    }

    dungeon.abilities.push(ability)
    return acc
  }, [])
  .sort((a, b) => a.dungeon.localeCompare(b.dungeon))
