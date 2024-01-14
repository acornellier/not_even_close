import { EnemyAbilityDetails, Result } from '../backend/sim'
import { roundTo } from '../backend/utils'
import { EnemyAbility } from '../backend/enemyAbilities'
import { EnemyAbilityLink } from './EnemyAbilities/EnemyAbilityLink'

interface Props {
  results: Result[]
  enemyAbility: EnemyAbility | null
  enemyAbilityDetails: EnemyAbilityDetails | null
}

export function Results({ results, enemyAbility, enemyAbilityDetails }: Props) {
  const fullDetails = results.length <= 1

  const matchesAbility =
    enemyAbility &&
    enemyAbilityDetails &&
    enemyAbilityDetails.name === enemyAbility.name &&
    enemyAbilityDetails.baseDamage === enemyAbility.damage &&
    enemyAbilityDetails.isAoe === enemyAbility.isAoe &&
    enemyAbilityDetails.isBossAbility === !enemyAbility.isTrashAbility

  return (
    <div className="flex flex-col gap-4">
      {!fullDetails && matchesAbility && (
        <EnemyAbilityLink key={enemyAbility.name} ability={enemyAbility} />
      )}
      {results.map((result, idx) => (
        <div key={idx}>
          {fullDetails ? (
            <div>
              <div className="font-bold mb-2 text-4xl">
                {result.survival ? (
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
          ) : (
            <div className="flex gap-1 mt-1">
              <span className="flex items-center gap-1">
                {result.spec.spec} {result.spec.class}:
              </span>
              <div className="font-bold">
                {result.survival ? (
                  <span className="text-green-500">You will live</span>
                ) : (
                  <span className="text-red-500">You will die</span>
                )}
              </div>
            </div>
          )}
          {fullDetails && (
            <>
              <div>Damage scaling: {result.damageScaling.toLocaleString('en-US')}</div>
              <div>Unmitigated damage: {result.scaledDamage.toLocaleString('en-US')}</div>
              <div>
                Damage mitigated: {result.mitigatedDamage.toLocaleString('en-US')} (
                {roundTo(result.damageReduction * 100, 2).toLocaleString('en-US')}%)
              </div>
              <div>
                Actual damage taken: {result.actualDamageTaken.toLocaleString('en-US')}
              </div>
              <div>Starting health: {result.startingHealth.toLocaleString('en-US')}</div>
              <div>Absorbs: {result.absorbs.toLocaleString('en-US')}</div>
              <div>Total health: {result.totalHealth.toLocaleString('en-US')}</div>
            </>
          )}
          <div className={fullDetails ? 'font-bold' : ''}>
            {result.survival ? (
              <span>
                Health remaining: {result.healthRemaining.toLocaleString('en-US')} (
                {roundTo(
                  (result.healthRemaining / result.startingHealth) * 100,
                  2
                ).toLocaleString('en-US')}
                %
              </span>
            ) : (
              `Overkill: ${(-result.healthRemaining).toLocaleString('en-US')}`
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
