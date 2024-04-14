import { ClassSpec } from '../classes'
import { Ability, AbilityCombo } from '../ability'
import { Character } from '../characters'
import { Dungeon, EnemyAbility } from '../enemyAbilities/enemies'

export interface Result {
  main: AbilityResult
  dungeon: DungeonAbilityResult[]
}

export interface AbilityResult {
  damageScaling: number
  scaledDamage: number
  characters: CharacterResult[][]
}

export interface DungeonAbilityResult extends AbilityResult {
  enemyAbility: EnemyAbility
}

export interface CharacterStats {
  stamina: number
  versatility: number
  avoidance: number
  armor: number
  mainStat: number
}

export interface CharacterPartialResult {
  spec: ClassSpec
  adjustedStats: CharacterStats
  abilities: Ability[]
  startingHealth: number
}

export interface CharacterResult {
  spec: ClassSpec
  adjustedStats: CharacterStats
  abilities: Ability[]
  damageReduction: number
  mitigatedDamage: number
  actualDamageTaken: number
  startingHealth: number
  absorbs: number
  totalHealth: number
  healthRemaining: number
}

export interface KeyDetails {
  keyLevel: number
  isTyran: boolean
}

export interface EnemyAbilityDetails {
  name?: string
  damage: number
  aoe: boolean
  trashAbility?: boolean
  physical?: boolean
  ignoresArmor?: boolean
}

export interface SimInput {
  characters: Character[]
  groupAbilities: AbilityCombo[]
  selectedCombo: number
  customDrs: number[]
  customAbsorbs: number[]
  keyDetails: KeyDetails
  enemyAbilityDetails: EnemyAbilityDetails
  dungeon: Dungeon | null
  isBeta: boolean
}
