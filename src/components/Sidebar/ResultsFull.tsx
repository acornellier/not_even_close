import type { EnemyAbility } from '../../backend/enemyAbilities/enemies'
import { OverkillText } from './OverkillText'
import { ResultDetails } from './ResultDetails'
import { EnemyAbilityResult } from './EnemyAbilityResult'
import type { AbilityResult, KeyDetails } from '../../backend/sim/simTypes'
import { formatNumber } from '../../backend/utils.ts'

interface Props {
  result: AbilityResult
  enemyAbility: EnemyAbility | null
  keyDetails: KeyDetails
}

export function ResultsFull({ result, enemyAbility, keyDetails }: Props) {
  const charResult = result.characters[0]
  if (!charResult) return false

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
      <EnemyAbilityResult ability={enemyAbility} keyDetails={keyDetails} />
      <div>Damage scaling: {formatNumber(result.damageScaling)}</div>
      <div>Unmitigated damage: {formatNumber(result.scaledDamage)}</div>
      <ResultDetails charResult={charResult} />
      <OverkillText result={charResult} bold />
    </div>
  )
}
