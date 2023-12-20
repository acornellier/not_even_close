import { CharacterStats } from './characterStats'
import { WowClass } from './classes'
import { Ability } from './abilities'

export interface Result {
  damageScaling: number
  scaledDamage: number
  damageReduction: number
  mitigatedDamage: number
  actualDamageTaken: number
  startingHealth: number
  healthRemaining: number
  survival: boolean
}

interface Input {
  characterStats: CharacterStats
  wowClass: WowClass | null
  abilities: Ability[]
  baseDamage: number
  keyLevel: number
  fortAmp: boolean
  tyranAmp: boolean
}

function getScalingFactor(
  keyLevel: number,
  fortAmp: boolean,
  tyranAmp: boolean
) {
  let scalingFactor = 1
  for (let i = 3; i <= keyLevel; ++i) {
    scalingFactor *= i < 10 ? 1.08 : 1.1
  }

  if (fortAmp) {
    scalingFactor *= 1.3
  } else if (tyranAmp) {
    scalingFactor *= 1.15
  }

  return Math.round(scalingFactor * 100) / 100
}

function getStartingHealth(
  characterStats: CharacterStats,
  abilities: Ability[]
) {
  let startingHealth = characterStats.stamina * 20
  for (const ability of abilities) {
    if (ability.healthIncrease) {
      startingHealth *= 1 + ability.healthIncrease
    }
  }

  return startingHealth
}

function getDamageReduction(
  characterStats: CharacterStats,
  abilities: Ability[]
) {
  let inverseDr = 1

  const versatilityDr = characterStats.versatilityPercent / 100 / 2
  inverseDr *= 1 - versatilityDr

  for (const ability of abilities) {
    inverseDr *= 1 - ability.dr
  }

  return 1 - inverseDr
}

export function simulate({
  characterStats,
  wowClass,
  abilities,
  keyLevel,
  fortAmp,
  tyranAmp,
  baseDamage,
}: Input): Result {
  const damageScaling = getScalingFactor(keyLevel, fortAmp, tyranAmp)
  const scaledDamage = Math.round(baseDamage * damageScaling)

  const startingHealth = getStartingHealth(characterStats, abilities)

  const damageReduction = getDamageReduction(characterStats, abilities)
  const mitigatedDamage = Math.round(scaledDamage * damageReduction)
  const actualDamageTaken = Math.round(scaledDamage - mitigatedDamage)

  const healthRemaining = startingHealth - actualDamageTaken
  const survival = healthRemaining > 0

  return {
    damageScaling,
    scaledDamage,
    damageReduction,
    mitigatedDamage,
    actualDamageTaken,
    startingHealth,
    healthRemaining,
    survival,
  }
}
