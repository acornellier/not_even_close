export interface CharacterStatsInput {
  stamina: number | undefined
  versatilityDrPercent: number | undefined
  avoidancePercent: number | undefined
}

export interface CharacterStats {
  stamina: number
  versatilityDr: number
  avoidance: number
}
