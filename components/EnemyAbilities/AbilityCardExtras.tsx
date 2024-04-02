import { EnemyAbility, TimeBetweenCasts } from '../../backend/dungeons'
import { ClockIcon } from '@heroicons/react/24/outline'
import { TooltipStyled } from '../Common/TooltipStyled'

interface Props {
  ability: EnemyAbility
}

function printTimeBetweenCasts(time: TimeBetweenCasts | undefined) {
  if (!time) return '?'

  if (Array.isArray(time)) return `${time[0]}-${time[1]} sec`
  return `~${time} sec`
}

export function AbilityCardExtras({ ability }: Props) {
  return (
    <div className="w-fit">
      <div className="flex gap-1" data-tooltip-id="time-between-casts-tooltip">
        <ClockIcon height={24} />
        {printTimeBetweenCasts(ability.timeBetweenCasts)}
      </div>
      <TooltipStyled id="time-between-casts-tooltip">Time between casts</TooltipStyled>
    </div>
  )
}
