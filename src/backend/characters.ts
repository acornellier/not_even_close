import type { ClassSpec } from './classes'
import type { Ability, SelectedAbility } from './ability'

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
  abilities: SelectedAbility[]
  externals: SelectedAbility[]
  loadedProfileId?: string
}

export interface OldCharacter extends Omit<Character, 'abilities' | 'externals'> {
  abilities: Ability[]
  externals: Ability[]
}

export interface Profile {
  id: string
  name: string
  classSpec: ClassSpec
  stats: CharacterStatsInput
}

export type UpdateCharacter = (value: Partial<Character>, addTepidVers?: boolean) => void
