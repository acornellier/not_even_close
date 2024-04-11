'use client'

import { useToasts } from './Common/Toasts/useToasts'
import { useEffect, useState } from 'react'
import { spellByIdApi } from './api/spellByIdApi'
import { Simulator } from './Simulator'
import { Dungeon, EnemyAbility } from '../backend/enemyAbilities/enemies'
import { useSearchParams } from 'next/navigation'

interface Props {
  dungeons: Dungeon[]
  spellId: number
}

export function SimulatorWithDefaultEnemySpell({ dungeons, spellId }: Props) {
  const { addToast } = useToasts()
  const [enemyAbility, setDefaultEnemyAbility] = useState<EnemyAbility | undefined>()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!spellId) return

    spellByIdApi(spellId).then((enemyAbility) => {
      setDefaultEnemyAbility({
        ...enemyAbility,
        trashAbility: searchParams.get('trash') === 'true',
      })
      addToast({
        message: `Automatically set ability details for ${enemyAbility.name} (id ${spellId})`,
        type: 'success',
      })
    })
  }, [addToast, spellId])

  return <Simulator dungeons={dungeons} defaultEnemyAbility={enemyAbility} />
}
