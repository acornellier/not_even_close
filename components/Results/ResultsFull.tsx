import { EnemyAbilityDetails, Result } from '../../backend/sim'
import { EnemyAbility } from '../../backend/enemyAbilities'
import { EnemyAbilityLink } from '../EnemyAbilities/EnemyAbilityLink'
import { OverkillText } from './OverkillText'
import { ResultDetails } from './ResultDetails'

interface Props {
  result: Result
  enemyAbility: EnemyAbility | null
  enemyAbilityDetails: EnemyAbilityDetails | null
}

export function ResultsFull({ result, enemyAbility, enemyAbilityDetails }: Props) {
  const matchesAbility =
    enemyAbility &&
    enemyAbilityDetails &&
    enemyAbilityDetails.name === enemyAbility.name &&
    enemyAbilityDetails.baseDamage === enemyAbility.damage &&
    enemyAbilityDetails.isAoe === enemyAbility.isAoe &&
    enemyAbilityDetails.isBossAbility === !enemyAbility.isTrashAbility

  const charResult = result.characters[0]

  return (
    <div className="flex flex-col">
      <div>
        <div className="font-bold mb-2 text-4xl">
          {charResult.healthRemaining > 0 ? (
            <span>
              You will <span className="text-green-500">live</span>
            </span>
          ) : (
            <span>
              You will <span className="text-red-500">die</span>
            </span>
          )}
        </div>
        {matchesAbility && (
          <EnemyAbilityLink key={enemyAbility.name} ability={enemyAbility} />
        )}
      </div>

      <div>Damage scaling: {result.damageScaling.toLocaleString('en-US')}</div>
      <div>Unmitigated damage: {result.scaledDamage.toLocaleString('en-US')}</div>
      <ResultDetails charResult={charResult} />
      <OverkillText result={charResult} bold />
    </div>
  )
}
