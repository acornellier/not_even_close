import { formatNumber, roundTo } from '../../util/utils.ts'
import type { CharacterResult } from '../../backend/sim/simTypes'

interface Props {
  charResult: CharacterResult
}

export function ResultDetails({ charResult }: Props) {
  const vers = roundTo(charResult.adjustedStats.versatility * 100, 2)
  const versDr = roundTo(vers / 2, 2)

  return (
    <>
      {charResult.damageDealtReduction > 0 && (
        <>
          <div>
            Enemy damage reduction:{' '}
            {formatNumber(roundTo(charResult.damageDealtReduction * 100, 2))}%
          </div>
          <div>Reduced damage: {formatNumber(charResult.reducedDamage)}</div>
        </>
      )}
      <div>
        Versatility: {formatNumber(vers)}% ({versDr}% DR)
      </div>
      <div>
        Damage mitigated: {formatNumber(charResult.mitigatedDamage)} (
        {formatNumber(roundTo(charResult.damageReduction * 100, 2))}%)
      </div>
      <div>Actual damage taken: {formatNumber(charResult.actualDamageTaken)}</div>
      <div>Starting health: {formatNumber(charResult.startingHealth)}</div>
      {charResult.absorbs > 0 && (
        <>
          <div>Absorbs: {formatNumber(charResult.absorbs)}</div>
          <div>Total health: {formatNumber(charResult.totalHealth)}</div>
        </>
      )}
    </>
  )
}
