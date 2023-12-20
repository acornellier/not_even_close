import { CharacterStats } from './characterStats'
import { Ability } from './ability'

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
  abilities: Ability[]
  baseDamage: number
  keyLevel: number
  isAoe: boolean
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
    scalingFactor *= i <= 10 ? 1.08 : 1.1
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
  const baseStamina = characterStats.stamina
  let stamina = baseStamina

  for (const ability of abilities) {
    if (ability.staminaIncrease) {
      stamina += baseStamina * ability.staminaIncrease
    }
  }

  const baseHealth = stamina * 20
  let startingHealth = baseHealth

  for (const ability of abilities) {
    if (ability.healthIncrease) {
      startingHealth += baseHealth * ability.healthIncrease
    }

    if (ability.absorb) {
      startingHealth += ability.absorb
    }
  }

  return startingHealth
}

function getDamageReduction(
  characterStats: CharacterStats,
  abilities: Ability[],
  damageIsAoe: boolean
) {
  let inverseDr = 1

  const versatilityDr = characterStats.versatilityDrPercent / 100
  inverseDr *= 1 - versatilityDr

  if (damageIsAoe) {
    inverseDr *= 1 - characterStats.avoidancePercent / 100
  }

  for (const ability of abilities) {
    if (ability.dr) {
      inverseDr *= 1 - ability.dr
    }

    if (ability.avoidance && damageIsAoe) {
      inverseDr *= 1 - ability.avoidance
    }
  }

  return 1 - inverseDr
}

export function simulate({
  characterStats,
  abilities,
  keyLevel,
  isAoe,
  fortAmp,
  tyranAmp,
  baseDamage,
}: Input): Result {
  const damageScaling = getScalingFactor(keyLevel, fortAmp, tyranAmp)
  const scaledDamage = Math.round(baseDamage * damageScaling)

  const startingHealth = getStartingHealth(characterStats, abilities)

  const damageReduction = getDamageReduction(characterStats, abilities, isAoe)
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
