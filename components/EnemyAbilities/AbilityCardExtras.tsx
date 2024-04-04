import { EnemyAbility, TimeBetweenCasts } from '../../backend/dungeons'
import { ClockIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { TooltipStyled } from '../Common/TooltipStyled'
import { WowIcon } from '../Common/WowIcon'
import { OutrangeIcon } from '../Common/Icons/OutrangeIcon'

interface Props {
  ability: EnemyAbility
}

function printTimeBetweenCasts(time: TimeBetweenCasts) {
  if (!time) return '?'

  if (Array.isArray(time)) return `${time[0]}-${time[1]} sec`
  return `~${time} sec`
}

export function AbilityCardExtras({ ability: { counterplay, timeBetweenCasts } }: Props) {
  return (
    <div className="flex gap-4 w-fit">
      <TooltipStyled id="counterplay-tooltip" />
      {timeBetweenCasts && (
        <div
          className="flex gap-1"
          data-tooltip-id="counterplay-tooltip"
          data-tooltip-content="Time between casts"
        >
          <ClockIcon height={24} />
          {printTimeBetweenCasts(timeBetweenCasts)}
        </div>
      )}
      <div className="flex gap-1">
        {counterplay?.combatDrop && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content={`${
              counterplay.combatDrop === 'cancel' ? 'Cancelled by' : 'Recasts on'
            } Meld, Invis, or Feign Death`}
          >
            <WowIcon icon="ability_ambush" size={24} />
          </div>
        )}
        {counterplay?.los && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content="Countered by LOS"
          >
            <EyeSlashIcon width={24} />
          </div>
        )}
        {counterplay?.outrange && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content={`Outranged at ${counterplay.outrange} yd`}
          >
            <OutrangeIcon height={24} width={24} />
            {counterplay.outrange} yd
          </div>
        )}
        {counterplay?.spellReflect && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content="Reflected by Spell Reflect"
          >
            <WowIcon icon="ability_warrior_shieldreflection" size={24} />
          </div>
        )}
        {counterplay?.diffuse && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content="Reflected by Diffuse Magic"
          >
            <WowIcon icon="spell_monk_diffusemagic" size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
