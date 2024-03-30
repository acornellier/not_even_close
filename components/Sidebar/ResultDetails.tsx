import { roundTo } from '../../backend/utils'
import { CharacterResult } from '../../backend/sim/simTypes'

interface Props {
  charResult: CharacterResult
}

export function ResultDetails({ charResult }: Props) {
  const vers = roundTo(charResult.adjustedStats.versatility * 100, 2)
  const versDr = roundTo(vers / 2, 2)

  return (
    <>
      <div>
        Versatility: {vers.toLocaleString('en-US')}% ({versDr}% DR)
      </div>
      <div>
        Damage mitigated: {charResult.mitigatedDamage.toLocaleString('en-US')} (
        {roundTo(charResult.damageReduction * 100, 2).toLocaleString('en-US')}%)
      </div>
      <div>
        Actual damage taken: {charResult.actualDamageTaken.toLocaleString('en-US')}
      </div>
      <div>Starting health: {charResult.startingHealth.toLocaleString('en-US')}</div>
      <div>Absorbs: {charResult.absorbs.toLocaleString('en-US')}</div>
      <div>Total health: {charResult.totalHealth.toLocaleString('en-US')}</div>
    </>
  )
}
