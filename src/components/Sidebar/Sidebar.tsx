﻿import { ResultsFull } from './ResultsFull'
import { ResultsMini } from './ResultsMini'
import { Instructions } from './Instructions'
import type { EnemyAbility } from '../../backend/enemyAbilities/enemies'
import type { KeyDetails, Result } from '../../backend/sim/simTypes'

interface Props {
  result: Result
  enemyAbility: EnemyAbility | null
  keyDetails: KeyDetails
}

export function Sidebar({ result, enemyAbility, keyDetails }: Props) {
  return (
    <div className="sm:sticky sm:top-10">
      {result.main.characters.length === 1 ? (
        <ResultsFull
          result={result.main}
          enemyAbility={enemyAbility}
          keyDetails={keyDetails}
        />
      ) : (
        <ResultsMini
          result={result.main}
          enemyAbility={enemyAbility}
          keyDetails={keyDetails}
        />
      )}

      <div className="border-2 my-4 border-gray-600" />

      {/*<TwitchStream />*/}

      <Instructions />
    </div>
  )
}
