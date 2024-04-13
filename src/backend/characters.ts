import { ClassSpec } from './classes'
import { Ability } from './ability'

export interface CharacterStatsInput {
  stamina: number | undefined
  versatilityRaw: number | undefined
  avoidanceRaw: number | undefined
  armor: number | undefined
  mainStat: number | undefined
}

export interface AbilityCombo {
  abilities: Ability[]
  externals: Ability[]
}

export interface Character {
  classSpec: ClassSpec
  stats: CharacterStatsInput
  abilityCombos: AbilityCombo[]
  loadedProfileId?: string
}

export interface Profile {
  id: string
  name: string
  classSpec: ClassSpec
  stats: CharacterStatsInput
}

export interface CharacterChanges {
  charIndex: number
  charChanges?: {
    classSpec?: ClassSpec
    stats?: CharacterStatsInput
    loadedProfileId?: string
  }
  comboChanges?: {
    abilities?: Ability[]
    externals?: Ability[]
  }
  addTepidVers?: boolean
}

export type UpdateCharacter = (value: CharacterChanges, addTepidVers?: boolean) => void
