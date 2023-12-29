import { Result } from '../backend/sim'
import { roundTo } from '../backend/utils'

interface Props {
  result: Result | null
}

export function Results({ result }: Props) {
  if (!result) return null

  return (
    <div>
      <div className="font-bold text-4xl mb-2">
        {result.survival ? (
          <span>
            You will <span className="text-green-500">survive</span>
          </span>
        ) : (
          <span>
            You will <span className="text-red-500">die</span>
          </span>
        )}
      </div>
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
