import type { CharacterResult } from '../../backend/sim/simTypes'
import { AbilityDetailsChip } from './AbilityDetailsChip'
import { thousands } from '../../backend/utils.ts'

interface Props {
  result: CharacterResult
}

export function CardResult({ result }: Props) {
  const survival = result.healthRemaining > 0
  const remainingHp = thousands(result.healthRemaining)

  return (
    <AbilityDetailsChip
      color={survival ? 'bg-green-500' : 'bg-red-600'}
      textColor={survival ? 'text-black' : 'text-white'}
    >
      <div className="flex gap-1">
        <div>{survival ? 'You live' : 'You die'}</div>
        <div className="hidden md:block">({remainingHp})</div>
      </div>
    </AbilityDetailsChip>
  )
}
