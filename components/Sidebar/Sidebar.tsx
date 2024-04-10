import { ResultsFull } from './ResultsFull'
import { ResultsMini } from './ResultsMini'
import { Instructions } from './Instructions'
import dynamic from 'next/dynamic'
import { EnemyAbility } from '../../backend/dungeons'
import { KeyDetails, Result } from '../../backend/sim/simTypes'

const TwitchStream = dynamic(
  () => import('./TwitchStream').then((mod) => mod.TwitchStream),
  { ssr: false },
)

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

      <TwitchStream />

      <Instructions />
    </div>
  )
}
