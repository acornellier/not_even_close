import type { Character, CharacterStatsInput } from '../characters'
import type { SelectedAbility, SelectedAbilityId } from '../ability'
import {
  augmentSelectedAbilityIds,
  enemyAbilityToDetails,
  fortActive,
  getStackedValue,
  guileActive,
  mapSelectedAbilityIds,
  tyranActive,
} from '../../util/utils.ts'
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
import { naturesGuardian } from '../classAbilities/druid.ts'
import { shieldOfTheRighteous } from '../classAbilities/paladin.ts'

function getScalingFactor(keyDetails: KeyDetails, isTrashAbility: boolean) {
  let scalingFactor = 1
  for (let i = 2; i <= keyDetails.keyLevel; ++i) {
    scalingFactor *= 1.1
  }

  if (fortActive(keyDetails) && isTrashAbility) {
    scalingFactor *= 1.2
  } else if (tyranActive(keyDetails) && !isTrashAbility) {
    scalingFactor *= 1.15
  }

  if (guileActive(keyDetails)) {
    scalingFactor *= 1.1
  }

  return Math.round(scalingFactor * 100) / 100
}

export function scaleDamage(
  keyDetails: KeyDetails,
  enemyAbilityDetails: EnemyAbilityDetails,
) {
  const damageScaling = getScalingFactor(keyDetails, !!enemyAbilityDetails.trashAbility)
  const scaledDamage = Math.round(enemyAbilityDetails.damage * damageScaling)
  return { damageScaling, scaledDamage }
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
    masteryPercent: characterStats.masteryPercent ?? 0,
  }

  for (const { ability, stacks } of abilities) {
    if (ability.staminaIncrease) {
      adjustedStats.stamina *= 1 + ability.staminaIncrease * (stacks ?? 1)
    }

    if (ability.armorIncrease) {
      adjustedStats.armor *= 1 + ability.armorIncrease * (stacks ?? 1)
    }

    if (ability.id === shieldOfTheRighteous.id) {
      adjustedStats.armor += 1.6 * adjustedStats.mainStat
    }
  }

  adjustedStats.stamina = Math.floor(adjustedStats.stamina)

  let rawVers = characterStats.versatilityRaw ?? 0
  for (const { ability, stacks } of abilities) {
    if (ability.versRawIncrease) {
      rawVers += ability.versRawIncrease * (stacks ?? 1)
    }

    if (ability.armorRawIncrease) {
      adjustedStats.armor += ability.armorRawIncrease
    }
  }

  adjustedStats.versatility = versRawToPercent(rawVers) / 100
  for (const { ability, stacks } of abilities) {
    if (ability.versIncrease) {
      adjustedStats.versatility += ability.versIncrease * (stacks ?? 1)
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
    } else if (ability.id === naturesGuardian.id) {
      startingHealth *= 1 + characterStats.masteryPercent / 100
    }
  }

  return Math.round(startingHealth)
}

function getPartialResults(
  characters: Character[],
  groupAbilities: SelectedAbilityId[],
): CharacterPartialResult[] {
  const augmentedGroupAbilities = augmentSelectedAbilityIds(
    mapSelectedAbilityIds(groupAbilities),
    groupAbilities,
  )

  return characters.map<CharacterPartialResult>((character) => {
    const augmentedSelectedAbilities = augmentSelectedAbilityIds(
      mapSelectedAbilityIds(character.abilities),
      character.abilities,
    )

    const augmentedExternals = augmentSelectedAbilityIds(
      mapSelectedAbilityIds(character.externals),
      character.externals,
    )

    const abilities = [
      ...augmentedSelectedAbilities,
      ...augmentedExternals,
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
  const { damageScaling, scaledDamage } = scaleDamage(keyDetails, enemyAbilityDetails)

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
