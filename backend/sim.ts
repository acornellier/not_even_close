import { CharacterStats } from './characterStats'
import { Ability } from './ability'

export interface Result {
  damageScaling: number
  scaledDamage: number
  damageReduction: number
  mitigatedDamage: number
  actualDamageTaken: number
  startingHealth: number
  absorbs: number
  totalHealth: number
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

function getScalingFactor(keyLevel: number, fortAmp: boolean, tyranAmp: boolean) {
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

function getAdjustedStats(characterStats: CharacterStats, abilities: Ability[]) {
  let adjustedStats = { ...characterStats }

  const baseStamina = characterStats.stamina

  for (const ability of abilities) {
    if (ability.staminaIncrease) {
      adjustedStats.stamina += baseStamina * ability.staminaIncrease
    }
  }

  for (const ability of abilities) {
    if (ability.versIncrease) {
      adjustedStats.versatility += ability.versIncrease
    }
  }

  return adjustedStats
}

function getStartingHealth(characterStats: CharacterStats, abilities: Ability[]) {
  const baseHealth = characterStats.stamina * 20
  let startingHealth = baseHealth

  for (const ability of abilities) {
    if (ability.healthIncrease) {
      startingHealth += baseHealth * ability.healthIncrease
    }
  }

  return startingHealth
}

function getAbsorbs(
  characterStats: CharacterStats,
  abilities: Ability[],
  startingHealth: number
) {
  let absorbs = 0

  for (const ability of abilities) {
    if (ability.absorbHealthMultiplier) {
      const versMultiplier = ability.absorbVersAffected ? characterStats.versatility : 0
      absorbs += ability.absorbHealthMultiplier * startingHealth * (1 + versMultiplier)
    }

    if (ability.rawAbsorb) {
      absorbs += ability.rawAbsorb
    }
  }

  return absorbs
}

function getDamageReduction(
  characterStats: CharacterStats,
  abilities: Ability[],
  damageIsAoe: boolean
) {
  let inverseDr = 1 - characterStats.versatility / 2

  if (damageIsAoe) {
    inverseDr *= 1 - characterStats.avoidance
  }

  for (const ability of abilities) {
    if (ability.dr) {
      inverseDr *= 1 - ability.dr
    }

    if (ability.aoeDr && damageIsAoe) {
      inverseDr *= 1 - ability.aoeDr
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

  const adjustedStats = getAdjustedStats(characterStats, abilities)
  const startingHealth = getStartingHealth(adjustedStats, abilities)
  const absorbs = getAbsorbs(adjustedStats, abilities, startingHealth)
  const effectiveHealth = startingHealth + absorbs

  const damageReduction = getDamageReduction(adjustedStats, abilities, isAoe)
  const mitigatedDamage = Math.round(scaledDamage * damageReduction)
  const actualDamageTaken = Math.round(scaledDamage - mitigatedDamage)

  const healthRemaining = effectiveHealth - actualDamageTaken
  const survival = healthRemaining > 0

  return {
    damageScaling,
    scaledDamage,
    damageReduction,
    mitigatedDamage,
    actualDamageTaken,
    startingHealth,
    absorbs,
    totalHealth: effectiveHealth,
    healthRemaining,
    survival,
  }
}
