import { EnemyAbility } from '../../backend/dungeons'
import { OverkillText } from './OverkillText'
import { ResultDetails } from './ResultDetails'
import { SpecIcon } from '../Common/SpecIcon'
import { EnemyAbilityResult } from './EnemyAbilityResult'
import { AbilityResult, KeyDetails } from '../../backend/sim/simTypes'

interface Props {
  result: AbilityResult
  enemyAbility: EnemyAbility | null
  keyDetails: KeyDetails
}

export function ResultsMini({ result, enemyAbility, keyDetails }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <EnemyAbilityResult enemyAbility={enemyAbility} keyDetails={keyDetails} />
        <div>Damage scaling: {result.damageScaling.toLocaleString('en-US')}</div>
        <div>Unmitigated damage: {result.scaledDamage.toLocaleString('en-US')}</div>
      </div>

      {result.characters.map((charResult, idx) => (
        <div key={idx}>
          <div className="flex gap-1 mt-1 font-bold">
            <SpecIcon
              className="border border-gray-500"
              wowClass={charResult.spec.class}
              spec={charResult.spec.spec}
              size={24}
            />
            <span className="flex items-center gap-1">
              {charResult.spec.spec} {charResult.spec.class}:
            </span>
            {charResult.healthRemaining > 0 ? (
              <span className="text-green-500">You live</span>
            ) : (
              <span className="text-red-500">You die</span>
            )}
          </div>
          <ResultDetails charResult={charResult} />
          <OverkillText result={charResult} />
        </div>
      ))}
    </div>
  )
}
