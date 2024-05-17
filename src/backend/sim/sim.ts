import type { Character, CharacterStatsInput } from '../characters'
import type { SelectedAbility } from '../ability'
import {
  augmentSelectedAbilities,
  enemyAbilityToDetails,
  getStackedValue,
} from '../utils'
import { avoidanceRawToPercent, staminaToHp, versRawToPercent } from '../stats'
import type {
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

function getScalingFactor({ keyLevel, isTyran }: KeyDetails, isTrashAbility: boolean) {
  let scalingFactor = 1
  for (let i = 2; i <= keyLevel; ++i) {
    scalingFactor *= 1.1
  }

  if (!isTyran && isTrashAbility) {
    scalingFactor *= 1.3
  } else if (isTyran && !isTrashAbility) {
    scalingFactor *= 1.15
  }

  return Math.round(scalingFactor * 100) / 100
}

function getAdjustedStats(
  characterStats: CharacterStatsInput,
  abilities: SelectedAbility[],
) {
  const adjustedStats: CharacterStats = {
    stamina: characterStats.stamina ?? 0,
    versatility: 0,
    avoidance: avoidanceRawToPercent(characterStats.avoidanceRaw ?? 0) / 100,
    armor: characterStats.armor ?? 0,
    mainStat: characterStats.mainStat ?? 0,
  }

  for (const { ability } of abilities) {
    if (ability.staminaIncrease) {
      adjustedStats.stamina *= 1 + ability.staminaIncrease
    }
  }

  adjustedStats.stamina = Math.floor(adjustedStats.stamina)

  let rawVers = characterStats.versatilityRaw ?? 0
  for (const { ability } of abilities) {
    if (ability.versRawIncrease) {
      rawVers += ability.versRawIncrease
    }
  }

  adjustedStats.versatility = versRawToPercent(rawVers) / 100
  for (const { ability } of abilities) {
    if (ability.versIncrease) {
      adjustedStats.versatility += ability.versIncrease
    }
  }

  return adjustedStats
}

function getStartingHealth(characterStats: CharacterStats, abilities: SelectedAbility[]) {
  let startingHealth = staminaToHp(characterStats.stamina)

  for (const { ability, stacks } of abilities) {
    if (ability.healthIncrease) {
      startingHealth *=
        1 + getStackedValue(ability.healthIncrease, stacks, ability.stacks)
    }
  }

  return Math.round(startingHealth)
}

function getPartialResults(
  characters: Character[],
  groupAbilities: SelectedAbility[],
): CharacterPartialResult[] {
  const augmentedGroupAbilities = augmentSelectedAbilities(groupAbilities, groupAbilities)

  return characters.map<CharacterPartialResult>((character) => {
    const augmentedSelectedAbilities = augmentSelectedAbilities(
      character.abilities,
      character.abilities,
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

function getDamageDealtReduction(abilities: SelectedAbility[]) {
  let damageDealtReduction = 1

  for (const { ability, stacks } of abilities) {
    if (ability.damageDealtReduction) {
      damageDealtReduction *=
        1 - getStackedValue(ability.damageDealtReduction, stacks, ability.stacks)
    }
  }

  return 1 - damageDealtReduction
}

function getAbilityResult(
  keyDetails: KeyDetails,
  charPartialResults: CharacterPartialResult[],
  enemyAbilityDetails: EnemyAbilityDetails,
  customAbsorbs: number[],
  customDrs: number[],
): AbilityResult {
  const damageScaling = getScalingFactor(keyDetails, !!enemyAbilityDetails.trashAbility)
  const scaledDamage = Math.round(enemyAbilityDetails.damage * damageScaling)

  return {
    enemyAbilityDetails,
    damageScaling,
    scaledDamage,
    characters: charPartialResults.map<CharacterResult>((charResult) => {
      const { spec, startingHealth, adjustedStats, abilities } = charResult

      const damageDealtReduction = getDamageDealtReduction(abilities)
      const reducedDamage = Math.round(scaledDamage * (1 - damageDealtReduction))

      const absorbs = getAbsorbs(
        charResult,
        customAbsorbs,
        enemyAbilityDetails,
        charPartialResults,
      )

      const damageReduction = getDamageReduction(
        adjustedStats,
        abilities,
        customDrs,
        enemyAbilityDetails,
        startingHealth,
        reducedDamage,
      )

      const healthWithAbsorbs = startingHealth + absorbs
      const mitigatedDamage = Math.round(reducedDamage * damageReduction)
      const actualDamageTaken = Math.round(reducedDamage - mitigatedDamage)

      const extraAbsorbs = getExtraAbsorbs(abilities, startingHealth, actualDamageTaken)
      const totalHealth = healthWithAbsorbs + extraAbsorbs

      const healthRemaining = totalHealth - actualDamageTaken

      return {
        spec,
        adjustedStats,
        abilities,
        damageDealtReduction,
        reducedDamage,
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
}: SimInput): Result {
  const charPartialResults = getPartialResults(characters, groupAbilities)

  const mainResults = getAbilityResult(
    keyDetails,
    charPartialResults,
    enemyAbilityDetails,
    customAbsorbs,
    customDrs,
  )

  const dungeonResults = dungeon
    ? dungeon.abilities.map((enemyAbility) =>
        getAbilityResult(
          keyDetails,
          charPartialResults,
          enemyAbilityToDetails(enemyAbility),
          customAbsorbs,
          customDrs,
        ),
      )
    : []

  return {
    main: mainResults,
    dungeon: dungeonResults,
  }
}
