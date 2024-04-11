import { CharacterResult } from '../../backend/sim/simTypes'
import { AbilityDetailsChip } from './AbilityDetailsChip'

interface Props {
  result: CharacterResult
}

export function CardResult({ result }: Props) {
  const survival = result.healthRemaining > 0
  const remainingHp = result.healthRemaining.toLocaleString('en-US')

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
