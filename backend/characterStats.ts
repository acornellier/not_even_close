import { ClassSpec } from './classes'
import { Ability } from './ability'

export interface CharacterStatsInput {
  stamina: number | undefined
  versatilityPercent: number | undefined
  avoidancePercent: number | undefined
}

export interface CharacterStats {
  stamina: number
  versatility: number
  avoidance: number
}

export interface Character {
  classSpec: ClassSpec
  stats: CharacterStatsInput
  abilities: Ability[]
  externals: Ability[]
}
