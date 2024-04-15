import { useToasts } from './Common/Toasts/useToasts'
import { useEffect, useState } from 'react'
import { spellByIdApi } from '../api/spellByIdApi'
import { Simulator } from './Simulator'
import type { EnemyAbility } from '../backend/enemyAbilities/enemies'
import { useParams, useSearchParams } from 'react-router-dom'
import { grimoireToEnemyAbility } from '../backend/enemyAbilities/grimoireConverter.ts'

export function SimulatorWithDefaultEnemySpell() {
  const { addToast } = useToasts()
  const [enemyAbility, setDefaultEnemyAbility] = useState<EnemyAbility | undefined>()
  const { spellId } = useParams()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (!spellId) return

    spellByIdApi(Number(spellId)).then((grimoireSpell) => {
      const enemyAbility = grimoireToEnemyAbility(grimoireSpell, 's4')
      setDefaultEnemyAbility({
        ...enemyAbility,
        trashAbility: searchParams.get('trash') === 'true',
      })
      addToast({
        message: `Automatically set ability details for ${enemyAbility.name} (id ${spellId})`,
        type: 'success',
      })
    })
  }, [addToast, searchParams, spellId])

  return <Simulator defaultEnemyAbility={enemyAbility} />
}
