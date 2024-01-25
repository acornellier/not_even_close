import { AbilityResult, EnemyAbilityDetails, Result } from '../../backend/sim'
import { EnemyAbility } from '../../backend/dungeons'
import { EnemyAbilityCard } from '../EnemyAbilities/EnemyAbilityCard'
import { OverkillText } from './OverkillText'
import { ResultDetails } from './ResultDetails'

interface Props {
  result: AbilityResult
}

export function ResultsFull({ result }: Props) {
  const charResult = result.characters[0]

  return (
    <div className="flex flex-col">
      <div className="font-bold mb-2 text-4xl">
        {charResult.healthRemaining > 0 ? (
          <span>
            You <span className="text-green-500">live</span>
          </span>
        ) : (
          <span>
            You <span className="text-red-500">die</span>
          </span>
        )}
      </div>

      <div>Damage scaling: {result.damageScaling.toLocaleString('en-US')}</div>
      <div>Unmitigated damage: {result.scaledDamage.toLocaleString('en-US')}</div>
      <ResultDetails charResult={charResult} />
      <OverkillText result={charResult} bold />
    </div>
  )
}
