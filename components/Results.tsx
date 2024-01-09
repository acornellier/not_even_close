import { EnemyAbilityDetails, Result } from '../backend/sim'
import { roundTo } from '../backend/utils'
import { EnemyAbility } from '../backend/enemyAbilities'
import Image from 'next/image'
import { EnemyAbilityLink } from './EnemyAbilities/EnemyAbilityLink'

interface Props {
  result: Result | null
  enemyAbility: EnemyAbility | null
  enemyAbilityDetails: EnemyAbilityDetails | null
}

export function Results({ result, enemyAbility, enemyAbilityDetails }: Props) {
  if (!result) return null

  const matchesAbility =
    enemyAbility &&
    enemyAbilityDetails &&
    enemyAbilityDetails.name === enemyAbility.name &&
    enemyAbilityDetails.baseDamage === enemyAbility.damage &&
    enemyAbilityDetails.isAoe === enemyAbility.isAoe &&
    enemyAbilityDetails.isBossAbility === !enemyAbility.isTrashAbility

  return (
    <div>
      <div className="font-bold text-4xl mb-2">
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
      <div>Damage scaling: {result.damageScaling.toLocaleString('en-US')}</div>
      <div>Scaled damage: {result.scaledDamage.toLocaleString('en-US')}</div>
      <div>
        Mitigated damage: {result.mitigatedDamage.toLocaleString('en-US')} (
        {roundTo(result.damageReduction * 100, 2).toLocaleString('en-US')}%)
      </div>
      <div>Actual damage taken: {result.actualDamageTaken.toLocaleString('en-US')}</div>
      <div>Starting health: {result.startingHealth.toLocaleString('en-US')}</div>
      <div>Absorbs: {result.absorbs.toLocaleString('en-US')}</div>
      <div>Total health: {result.totalHealth.toLocaleString('en-US')}</div>
      {result.survival ? (
        <div className="font-bold">
          Health remaining: {result.healthRemaining.toLocaleString('en-US')} (
          {roundTo(
            (result.healthRemaining / result.startingHealth) * 100,
            2
          ).toLocaleString('en-US')}
          %)
        </div>
      ) : (
        <div className="font-bold">
          Overkill: {(-result.healthRemaining).toLocaleString('en-US')}
        </div>
      )}
    </div>
  )
}
