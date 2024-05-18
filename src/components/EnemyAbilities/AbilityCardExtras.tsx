import type { EnemyAbility, TimeBetweenCasts } from '../../backend/enemyAbilities/enemies'
import { ClockIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { TooltipStyled } from '../Common/TooltipStyled'
import { AbilityIcon } from '../Common/AbilityIcon.tsx'
import { OutrangeIcon } from '../Common/Icons/OutrangeIcon'

interface Props {
  ability: EnemyAbility
}

function printTimeBetweenCasts(time: TimeBetweenCasts) {
  if (!time) return '?'

  if (Array.isArray(time)) return `${time[0]}-${time[1]} sec`
  return `~${time} sec`
}

export function AbilityCardExtras({
  ability: { combatDrop, los, outrange, spellReflect, diffuse, cooldown },
}: Props) {
  if (!combatDrop && !los && !outrange && !spellReflect && !diffuse && !cooldown)
    return null

  return (
    <div className="flex gap-4 w-fit">
      <TooltipStyled id="counterplay-tooltip" />
      {cooldown && (
        <div
          className="flex gap-1"
          data-tooltip-id="counterplay-tooltip"
          data-tooltip-content="Time between casts"
        >
          <ClockIcon height={24} />
          {printTimeBetweenCasts(cooldown)}
        </div>
      )}
      <div className="flex gap-1">
        {combatDrop && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content={`${
              combatDrop === 'cancel' ? 'Cancelled by' : 'Recasts on'
            } Meld, Invis, or Feign Death`}
          >
            <AbilityIcon icon="ability_ambush" size={24} />
          </div>
        )}
        {los && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content="Countered by LOS"
          >
            <EyeSlashIcon width={24} />
          </div>
        )}
        {outrange && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content={`Outranged at ${outrange} yd`}
          >
            <OutrangeIcon height={24} width={24} />
            {outrange} yd
          </div>
        )}
        {spellReflect && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content="Reflected by Spell Reflect"
          >
            <AbilityIcon icon="ability_warrior_shieldreflection" size={24} />
          </div>
        )}
        {diffuse && (
          <div
            className="flex gap-1"
            data-tooltip-id="counterplay-tooltip"
            data-tooltip-content="Reflected by Diffuse Magic"
          >
            <AbilityIcon icon="spell_monk_diffusemagic" size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
