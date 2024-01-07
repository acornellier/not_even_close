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

export interface KeyDetails {
  keyLevel: number
  isTyran: boolean
}

export interface EnemyAbilityDetails {
  baseDamage: number
  isBossAbility: boolean
  isAoe: boolean
}

interface Input {
  characterStats: CharacterStats
  abilities: Ability[]
  customDrs: number[]
  customAbsorbs: number[]
  keyDetails: KeyDetails
  enemyAbilityDetails: EnemyAbilityDetails
}

function getScalingFactor({ keyLevel, isTyran }: KeyDetails, isBossAbility: boolean) {
  let scalingFactor = 1
  for (let i = 3; i <= keyLevel; ++i) {
    scalingFactor *= i <= 10 ? 1.08 : 1.1
  }

  if (!isTyran && !isBossAbility) {
    scalingFactor *= 1.3
  } else if (isTyran && isBossAbility) {
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
  customAbsorbs: number[],
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

  for (const absorb of customAbsorbs) {
    absorbs += absorb
  }

  return absorbs
}

function getDamageReduction(
  characterStats: CharacterStats,
  abilities: Ability[],
  customDrs: number[],
  damageIsAoe: boolean,
  startingHealth: number,
  damageTaken: number
) {
  let inverseDr = 1 - characterStats.versatility / 2

  if (damageIsAoe) {
    inverseDr *= 1 - characterStats.avoidance
  }

  for (const ability of abilities) {
    if (ability.name === 'Dampen Harm') {
      const dr = 0.2 + (damageTaken / startingHealth) * 0.3
      inverseDr *= 1 - Math.min(dr, 0.5)
    } else if (ability.dr && ability.aoeDr && damageIsAoe) {
      inverseDr *= 1 - Math.max(ability.dr, ability.aoeDr)
    } else if (ability.dr) {
      inverseDr *= 1 - ability.dr
    } else if (ability.aoeDr && damageIsAoe) {
      inverseDr *= 1 - ability.aoeDr
    }
  }

  for (const dr of customDrs) {
    inverseDr *= 1 - dr * 0.01
  }

  return 1 - inverseDr
}

export function simulate({
  characterStats,
  abilities,
  customDrs,
  customAbsorbs,
  keyDetails,
  enemyAbilityDetails: { baseDamage, isBossAbility, isAoe },
}: Input): Result {
  const damageScaling = getScalingFactor(keyDetails, isBossAbility)
  const scaledDamage = Math.round(baseDamage * damageScaling)

  const adjustedStats = getAdjustedStats(characterStats, abilities)
  const startingHealth = getStartingHealth(adjustedStats, abilities)
  const absorbs = getAbsorbs(adjustedStats, abilities, customAbsorbs, startingHealth)
  const effectiveHealth = startingHealth + absorbs

  const damageReduction = getDamageReduction(
    adjustedStats,
    abilities,
    customDrs,
    isAoe,
    startingHealth,
    scaledDamage
  )
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
