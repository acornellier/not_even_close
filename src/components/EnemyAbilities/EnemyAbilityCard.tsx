import type { EnemyAbility } from '../../backend/enemyAbilities/enemies'
import { AbilityDetailsChip } from './AbilityDetailsChip'
import { TooltipStyled } from '../Common/TooltipStyled'
import type { AbilityResult, KeyDetails } from '../../backend/sim/simTypes'
import {
  QuestionMarkCircleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'
import { AbilityCardExtras } from './AbilityCardExtras'
import { CardResult } from './CardResult'
import { AbilityIcon } from '../Common/AbilityIcon.tsx'
import { roundHundred, shortRoundedNumber } from '../../util/utils.ts'
import { scaleDamage } from '../../backend/sim/sim.ts'
import { ShieldSlashIcon } from '../Common/Icons/ShieldSlashIcon.tsx'
import { isPtr } from '../../util/env.ts'

interface Props {
  ability: EnemyAbility
  onSelect?: () => void
  selected: boolean
  result: AbilityResult | undefined
  showExtras: boolean
  toggleExtras: () => void
  keyDetails: KeyDetails
}

export function EnemyAbilityCard({
  ability,
  onSelect,
  selected,
  result,
  showExtras,
  keyDetails,
}: Props) {
  const cardColor = selected ? 'bg-teal-600' : 'bg-teal-900'
  const hoverColor = !selected && 'hover:bg-teal-800'

  return (
    <div
      className={`flex flex-col gap-2 cursor-pointer rounded-md px-1 py-1 select-none ${hoverColor} ${cardColor}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-2 items-center basis-[200px] whitespace-nowrap">
          <a
            key={ability.name}
            className="min-w-[30px]"
            href={`https://www.wowhead.com/${isPtr ? 'ptr-2/' : ''}spell=${ability.id}?dd=23&ddsize=5`}
            target="_blank"
            rel="noreferrer"
          >
            <AbilityIcon icon={ability.icon} size={30} />
          </a>
          <div className="flex items-center gap-1">
            <div className="text-white">{ability.name}</div>
            {ability.tankOnly && (
              <ShieldExclamationIcon
                height={20}
                data-tooltip-id="enemy-ability-tank-tooltip"
              />
            )}
            <TooltipStyled id="enemy-ability-tank-tooltip">Tank buster</TooltipStyled>
            {ability.notes && (
              <QuestionMarkCircleIcon
                height={20}
                data-tooltip-id={`enemy-ability-tooltip-${ability.id}`}
              />
            )}
            <TooltipStyled id={`enemy-ability-tooltip-${ability.id}`}>
              {ability.notes}
            </TooltipStyled>
          </div>
        </div>
        <div className="flex justify-between grow gap-2">
          <div className="flex gap-2">
            <AbilityDetailsChip
              color="bg-gray-500"
              className="hidden sm:block"
              data-tooltip-id={`chip-damage-${ability.id}`}
            >
              {shortRoundedNumber(scaleDamage(keyDetails, ability).scaledDamage)} dmg
            </AbilityDetailsChip>
            {ability.variance !== undefined && ability.variance !== 0 && (
              <TooltipStyled id={`chip-damage-${ability.id}`}>
                <p>
                  This ability has {roundHundred(ability.variance)}% variance in its
                  damage.
                </p>
                <p>
                  Not Even Close assumes you will take the upper bound of this variance.
                </p>
              </TooltipStyled>
            )}
            <AbilityDetailsChip
              color={
                ability.aoeMultiplier
                  ? 'bg-amber-800'
                  : ability.aoe
                    ? 'bg-amber-600'
                    : 'bg-pink-700'
              }
              className="hidden sm:block"
            >
              {ability.aoeMultiplier ? 'Mixed' : ability.aoe ? 'AoE' : 'Single'}
            </AbilityDetailsChip>
            <AbilityDetailsChip
              color={ability.physical ? 'bg-orange-800' : 'bg-blue-500'}
              className="hidden sm:block"
            >
              {ability.physical ? 'Physical' : 'Magic'}
            </AbilityDetailsChip>
            {ability.ignoresArmor && (
              <ShieldSlashIcon height={20} data-tooltip-id="ignores-armor-tooltip" />
            )}
            <TooltipStyled id="ignores-armor-tooltip">Ignores armor</TooltipStyled>
          </div>
          <div className="flex gap-2">
            {result?.characters[0] && <CardResult result={result?.characters[0]} />}
          </div>
        </div>
      </div>
      {showExtras && <AbilityCardExtras ability={ability} />}
    </div>
  )
}
