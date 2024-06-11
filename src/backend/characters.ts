import type { ClassSpec } from './classes'
import type { SelectedAbilityId } from './ability'

export interface CharacterStatsInput {
  stamina: number | undefined
  versatilityRaw: number | undefined
  avoidanceRaw: number | undefined
  armor: number | undefined
  mainStat: number | undefined
  masteryPercent?: number | undefined
}

export interface Character {
  classSpec: ClassSpec
  stats: CharacterStatsInput
  abilities: SelectedAbilityId[]
  externals: SelectedAbilityId[]
  loadedProfileId?: string
}

export interface Profile {
  id: string
  name: string
  classSpec: ClassSpec
  stats: CharacterStatsInput
}

export type UpdateCharacter = (
  value: Partial<Character>,
  addTemperedVers?: boolean,
) => void
