import type { CharacterResult } from '../../backend/sim/simTypes'
import { AbilityDetailsChip } from './AbilityDetailsChip'
import { formatNumber, roundTo, shortRoundedNumber } from '../../util/utils.ts'
import { SkullIcon } from '../Common/Icons/SkullIcon.tsx'
import { HeartIcon } from '@heroicons/react/16/solid'

interface Props {
  result: CharacterResult
}

export function CardResult({ result }: Props) {
  const survival = result.healthRemaining > 0
  const remainingHp = shortRoundedNumber(result.healthRemaining)
  const remainingHpPercent = formatNumber(
    roundTo((result.healthRemaining / result.startingHealth) * 100, 2),
  )

  return (
    <AbilityDetailsChip color={survival ? 'bg-green-600' : 'bg-red-600'}>
      <div className="flex gap-1 items-center">
        <div className="hidden md:block">
          {remainingHp} ({remainingHpPercent}%)
        </div>
        <div>{survival ? <HeartIcon height={22} /> : <SkullIcon height={16} />}</div>
      </div>
    </AbilityDetailsChip>
  )
}
