import { ClassSpec } from './classes'
import { Ability } from './ability'

export interface CharacterStatsInput {
  stamina: number | undefined
  versatilityRaw: number | undefined
  avoidanceRaw: number | undefined
  armor: number | undefined
  mainStat: number | undefined
}

export interface Character {
  classSpec: ClassSpec
  stats: CharacterStatsInput
  abilities: Ability[]
  externals: Ability[]
  loadedProfileId?: string
}

export interface Profile {
  id: string
  name: string
  classSpec: ClassSpec
  stats: CharacterStatsInput
}

export type UpdateCharacter = (value: Partial<Character>, addTepidVers?: boolean) => void
