import type { EnemyAbility } from '../../backend/enemyAbilities/enemies'
import { AbilityDetailsChip } from './AbilityDetailsChip'
import { TooltipStyled } from '../Common/TooltipStyled'
import type { AbilityResult } from '../../backend/sim/simTypes'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'
import { AbilityCardExtras } from './AbilityCardExtras'
import { CardResult } from './CardResult'
import { WowIcon } from '../Common/WowIcon'
import { thousands } from '../../backend/utils.ts'

interface Props {
  ability: EnemyAbility
  onSelect?: () => void
  selected: boolean
  result: AbilityResult | undefined
  showExtras: boolean
  toggleExtras: () => void
}

export function EnemyAbilityCard({
  ability,
  onSelect,
  selected,
  result,
  showExtras,
  toggleExtras,
}: Props) {
  const cardColor = selected ? 'bg-teal-600' : 'bg-teal-900'
  const hoverColor = !selected && 'hover:bg-teal-800'

  const Chevron = showExtras ? ChevronUpIcon : ChevronDownIcon

  return (
    <div
      className={`flex flex-col gap-2 cursor-pointer rounded-md px-4 py-1 select-none ${hoverColor} ${cardColor}`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-2 items-center basis-[200px] whitespace-nowrap">
          <a
            key={ability.name}
            className="min-w-[30px]"
            href={`https://www.wowhead.com/spell=${ability.id}/`}
            target="_blank"
            rel="noreferrer"
          >
            <WowIcon icon={ability.icon} size={30} />
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
              data-tooltip-id={`chip-damage-${ability.name}`}
            >
              {thousands(ability.damage)} dmg
              {ability.variance !== undefined &&
                ability.variance !== 0 &&
                ` ±${ability.variance * 100}%`}
            </AbilityDetailsChip>
            {ability.variance !== undefined && ability.variance !== 0 && (
              <TooltipStyled id={`chip-damage-${ability.name}`}>
                <p>Some abilities have variance in their damage.</p>
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
          </div>
          <div className="flex gap-2">
            {result?.characters.length === 1 && (
              <CardResult result={result.characters[0]!} />
            )}
            <Chevron
              height={24}
              onClick={(e) => {
                e.stopPropagation()
                toggleExtras()
              }}
            />
          </div>
        </div>
      </div>
      {showExtras && <AbilityCardExtras ability={ability} />}
    </div>
  )
}
