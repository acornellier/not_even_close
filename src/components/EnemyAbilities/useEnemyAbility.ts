import { useLocalStorage } from '../../util/useLocalStorage'
import type { DungeonKey, EnemyAbility } from '../../backend/enemyAbilities/enemies'
import { dungeonKeys } from '../../backend/enemyAbilities/enemies'
import { useCallback, useEffect } from 'react'
import { enemyAbilityToDetails } from '../../backend/utils'
import type { EnemyAbilityDetails } from '../../backend/sim/simTypes'
import { dungeons } from '../../backend/enemyAbilities/dungeons.ts'

const defaultEnemyDetails: EnemyAbilityDetails = {
  damage: 200_000,
  aoe: false,
  trashAbility: false,
  physical: false,
  forcePhysicalReduction: false,
}

interface Props {
  defaultEnemyAbility?: EnemyAbility
}

export function useEnemyAbility({ defaultEnemyAbility }: Props) {
  const [enemyAbility, setEnemyAbility] = useLocalStorage<EnemyAbility | null>(
    'selectedAbility',
    null,
  )

  const [enemyAbilityDetails, setEnemyAbilityDetails] = useLocalStorage(
    'enemyAbilityDetails',
    defaultEnemyDetails,
  )

  const setEnemyAbilityWrapper = useCallback(
    (enemyAbility: EnemyAbility) => {
      setEnemyAbility(enemyAbility)
      setEnemyAbilityDetails(enemyAbilityToDetails(enemyAbility))
    },
    [setEnemyAbility, setEnemyAbilityDetails],
  )

  const setEnemyAbilityDetailsWrapper = useCallback(
    (details: EnemyAbilityDetails) => {
      setEnemyAbility(null)
      setEnemyAbilityDetails(details)
    },
    [setEnemyAbility, setEnemyAbilityDetails],
  )

  let [selectedDungeonKey, setSelectedDungeonKey] = useLocalStorage<DungeonKey | null>(
    'selectedDungeon',
    null,
  )

  const selectedDungeon = dungeons.find(({ key }) => key === selectedDungeonKey) ?? null

  if (selectedDungeonKey && !dungeonKeys.includes(selectedDungeonKey)) {
    setSelectedDungeonKey(null)
    selectedDungeonKey = null
  }

  useEffect(() => {
    if (!defaultEnemyAbility) return

    setEnemyAbilityWrapper(defaultEnemyAbility)

    for (const dungeon of dungeons) {
      const matchingAbility = dungeon.abilities.find(
        (spell) => spell.id === defaultEnemyAbility.id,
      )

      if (matchingAbility) {
        setSelectedDungeonKey(dungeon.key)
        setEnemyAbility(matchingAbility)
        break
      }
    }
  }, [
    defaultEnemyAbility,
    setEnemyAbility,
    setEnemyAbilityWrapper,
    setSelectedDungeonKey,
  ])

  return {
    selectedDungeon,
    setSelectedDungeonKey,
    enemyAbility,
    enemyAbilityDetails,
    setEnemyAbility: setEnemyAbilityWrapper,
    setEnemyAbilityDetails: setEnemyAbilityDetailsWrapper,
  }
}
