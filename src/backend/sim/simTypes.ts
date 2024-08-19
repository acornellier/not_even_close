import type { ClassSpec } from '../classes'
import type { SelectedAbility, SelectedAbilityId } from '../ability'
import type { Character } from '../characters'
import type { Dungeon } from '../enemyAbilities/enemies'

export interface Result {
  main: AbilityResult
  dungeon: AbilityResult[]
}

export interface AbilityResult {
  damageScaling: number
  scaledDamage: number
  enemyAbilityDetails: EnemyAbilityDetails
  characters: CharacterResult[]
}

export interface CharacterStats {
  stamina: number
  versatility: number
  avoidance: number
  armor: number
  mainStat: number
  masteryPercent: number
}

export interface CharacterPartialResult {
  spec: ClassSpec
  adjustedStats: CharacterStats
  abilities: SelectedAbility[]
  startingHealth: number
}

export interface CharacterResult {
  spec: ClassSpec
  adjustedStats: CharacterStats
  abilities: SelectedAbility[]
  damageDealtReduction: number
  damageReduction: number
  reducedDamage: number
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
  aoeMultiplier?: number
  trashAbility?: boolean
  physical?: boolean
  schools: string[]
  ignoresArmor?: boolean
}

export interface SimInput {
  characters: Character[]
  groupAbilities: SelectedAbilityId[]
  customDrs: number[]
  customAbsorbs: number[]
  keyDetails: KeyDetails
  enemyAbilityDetails: EnemyAbilityDetails
  dungeon: Dungeon | null
}
