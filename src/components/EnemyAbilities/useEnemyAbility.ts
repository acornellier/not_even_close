import { useLocalStorage } from '../../util/useLocalStorage'
import type { EnemyAbility } from '../../backend/enemyAbilities/enemies'
import { useCallback, useEffect } from 'react'
import { enemyAbilityToDetails } from '../../backend/utils'
import type { EnemyAbilityDetails } from '../../backend/sim/simTypes'

const defaultEnemyDetails: EnemyAbilityDetails = {
  damage: 100_000,
  aoe: false,
  trashAbility: false,
  physical: false,
  ignoresArmor: false,
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

  useEffect(() => {
    if (defaultEnemyAbility) {
      setEnemyAbilityWrapper(defaultEnemyAbility)
    }
  }, [defaultEnemyAbility, setEnemyAbilityWrapper])

  return {
    enemyAbility,
    enemyAbilityDetails,
    setEnemyAbility: setEnemyAbilityWrapper,
    setEnemyAbilityDetails: setEnemyAbilityDetailsWrapper,
  }
}
