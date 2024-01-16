import { EnemyAbilityDetails, Result } from '../../backend/sim'
import { roundTo } from '../../backend/utils'
import { EnemyAbility } from '../../backend/enemyAbilities'
import { EnemyAbilityLink } from '../EnemyAbilities/EnemyAbilityLink'
import { OverkillText } from './OverkillText'
import Image from 'next/image'
import { classSpecs } from '../../backend/classes'
import { ResultDetails } from './ResultDetails'

interface Props {
  result: Result
  enemyAbility: EnemyAbility | null
  enemyAbilityDetails: EnemyAbilityDetails | null
}

export function ResultsMini({ result, enemyAbility, enemyAbilityDetails }: Props) {
  const matchesAbility =
    enemyAbility &&
    enemyAbilityDetails &&
    enemyAbilityDetails.name === enemyAbility.name &&
    enemyAbilityDetails.baseDamage === enemyAbility.damage &&
    enemyAbilityDetails.isAoe === enemyAbility.isAoe &&
    enemyAbilityDetails.isBossAbility === !enemyAbility.isTrashAbility

  return (
    <div className="flex flex-col gap-4">
      <div>
        {matchesAbility && (
          <EnemyAbilityLink key={enemyAbility.name} ability={enemyAbility} />
        )}
        <div>Damage scaling: {result.damageScaling.toLocaleString('en-US')}</div>
        <div>Unmitigated damage: {result.scaledDamage.toLocaleString('en-US')}</div>
      </div>

      {result.characters.map((charResult, idx) => (
        <div key={idx}>
          <div className="flex gap-1 mt-1 font-bold">
            <Image
              className="rounded border border-gray-500"
              src={`https://wow.zamimg.com/images/wow/icons/medium/${
                classSpecs[charResult.spec.class][charResult.spec.spec].icon
              }.jpg`}
              height={24}
              width={24}
              alt={charResult.spec.spec}
            />
            <span className="flex items-center gap-1">
              {charResult.spec.spec} {charResult.spec.class}:
            </span>
            {charResult.healthRemaining > 0 ? (
              <span className="text-green-500">You will live</span>
            ) : (
              <span className="text-red-500">You will die</span>
            )}
          </div>
          <ResultDetails charResult={charResult} />
          <OverkillText result={charResult} />
        </div>
      ))}
    </div>
  )
}
