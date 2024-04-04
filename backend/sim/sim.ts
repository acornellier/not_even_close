import { Character, CharacterStatsInput } from '../characters'
import { Ability } from '../ability'
import { augmentAbilities, enemyAbilityToDetails } from '../utils'
import { avoidanceRawToPercent, staminaToHp, versRawToPercent } from '../stats'
import {
  AbilityResult,
  CharacterPartialResult,
  CharacterResult,
  CharacterStats,
  EnemyAbilityDetails,
  KeyDetails,
  Result,
  SimInput,
} from './simTypes'
import { getAbsorbs, getExtraAbsorbs } from './absorbs'
import { getDamageReduction } from './dr'
import { dungeonsByKey } from '../dungeons'

function getScalingFactor(
  { keyLevel, isTyran }: KeyDetails,
  isTrashAbility: boolean,
  isBeta: boolean
) {
  let scalingFactor = 1
  for (let i = 3; i <= keyLevel; ++i) {
    scalingFactor *= i <= 10 && !isBeta ? 1.08 : 1.1
  }

  if (!isTyran && isTrashAbility) {
    scalingFactor *= 1.3
  } else if (isTyran && !isTrashAbility) {
    scalingFactor *= 1.15
  }

  return Math.round(scalingFactor * 100) / 100
}

function getAdjustedStats(characterStats: CharacterStatsInput, abilities: Ability[]) {
  let adjustedStats: CharacterStats = {
    stamina: characterStats.stamina ?? 0,
    versatility: 0,
    avoidance: avoidanceRawToPercent(characterStats.avoidanceRaw ?? 0) / 100,
    armor: characterStats.armor ?? 0,
    mainStat: characterStats.mainStat ?? 0,
  }

  for (const ability of abilities) {
    if (ability.staminaIncrease) {
      adjustedStats.stamina *= 1 + ability.staminaIncrease
    }
  }

  adjustedStats.stamina = Math.floor(adjustedStats.stamina)

  let rawVers = characterStats.versatilityRaw ?? 0
  for (const ability of abilities) {
    if (ability.versRawIncrease) {
      rawVers += ability.versRawIncrease
    }
  }

  adjustedStats.versatility = versRawToPercent(rawVers) / 100
  for (const ability of abilities) {
    if (ability.versIncrease) {
      adjustedStats.versatility += ability.versIncrease
    }
  }

  return adjustedStats
}

function getStartingHealth(characterStats: CharacterStats, abilities: Ability[]) {
  let startingHealth = staminaToHp(characterStats.stamina)

  for (const ability of abilities) {
    if (ability.healthIncrease) {
      startingHealth *= 1 + ability.healthIncrease
    }
  }

  return Math.round(startingHealth)
}

function getPartialResults(
  characters: Character[],
  groupAbilities: Ability[]
): CharacterPartialResult[] {
  const augmentedGroupAbilities = augmentAbilities(groupAbilities, groupAbilities)

  return characters.map<CharacterPartialResult>((character) => {
    const augmentedSelectedAbilities = augmentAbilities(
      character.abilities,
      character.abilities
    )

    const abilities = [
      ...augmentedSelectedAbilities,
      ...character.externals,
      ...augmentedGroupAbilities,
    ]

    const adjustedStats = getAdjustedStats(character.stats, abilities)
    const startingHealth = getStartingHealth(adjustedStats, abilities)

    return {
      spec: character.classSpec,
      abilities,
      adjustedStats,
      startingHealth,
    }
  })
}

function getAbilityResult(
  keyDetails: KeyDetails,
  charPartialResults: CharacterPartialResult[],
  enemyAbilityDetails: EnemyAbilityDetails,
  customAbsorbs: number[],
  customDrs: number[],
  isBeta: boolean
): AbilityResult {
  const damageScaling = getScalingFactor(
    keyDetails,
    !!enemyAbilityDetails.trashAbility,
    isBeta
  )
  const scaledDamage = Math.round(enemyAbilityDetails.damage * damageScaling)

  return {
    enemyAbilityDetails,
    damageScaling,
    scaledDamage,
    characters: charPartialResults.map<CharacterResult>((charResult) => {
      const { spec, startingHealth, adjustedStats, abilities } = charResult

      const absorbs = getAbsorbs(
        charResult,
        customAbsorbs,
        enemyAbilityDetails,
        charPartialResults
      )

      const damageReduction = getDamageReduction(
        adjustedStats,
        abilities,
        customDrs,
        enemyAbilityDetails,
        startingHealth,
        scaledDamage
      )

      const healthWithAbsorbs = startingHealth + absorbs
      const mitigatedDamage = Math.round(scaledDamage * damageReduction)
      const actualDamageTaken = Math.round(scaledDamage - mitigatedDamage)

      const extraAbsorbs = getExtraAbsorbs(
        abilities,
        startingHealth,
        absorbs,
        actualDamageTaken
      )
      const totalHealth = healthWithAbsorbs + extraAbsorbs

      const healthRemaining = totalHealth - actualDamageTaken

      return {
        spec,
        adjustedStats,
        abilities,
        damageReduction,
        mitigatedDamage,
        actualDamageTaken,
        startingHealth,
        absorbs: absorbs + extraAbsorbs,
        totalHealth,
        healthRemaining,
      }
    }),
  }
}

export function simulate({
  characters,
  groupAbilities,
  customDrs,
  customAbsorbs,
  keyDetails,
  enemyAbilityDetails,
  dungeon,
  isBeta,
}: SimInput): Result {
  const charPartialResults = getPartialResults(characters, groupAbilities)

  const mainResults = getAbilityResult(
    keyDetails,
    charPartialResults,
    enemyAbilityDetails,
    customAbsorbs,
    customDrs,
    isBeta
  )

  const dungeonResults = dungeon
    ? dungeonsByKey[dungeon].abilities.map((enemyAbility) =>
        getAbilityResult(
          keyDetails,
          charPartialResults,
          enemyAbilityToDetails(enemyAbility),
          customAbsorbs,
          customDrs,
          isBeta
        )
      )
    : []

  return {
    main: mainResults,
    dungeon: dungeonResults,
  }
}
