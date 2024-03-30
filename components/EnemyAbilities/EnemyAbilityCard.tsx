import { EnemyAbility } from '../../backend/dungeons'
import Image from 'next/image'
import { AbilityDetailsChip } from './AbilityDetailsChip'
import { TooltipStyled } from '../Common/TooltipStyled'
import { AbilityResult } from '../../backend/sim/simTypes'

interface Props {
  ability: EnemyAbility
  onSelect?: () => void
  selected: boolean
  result: AbilityResult | undefined
}

export function EnemyAbilityCard({ ability, onSelect, selected, result }: Props) {
  const cardColor = selected ? 'bg-teal-600' : 'bg-teal-900'
  const hoverColor = !selected && 'hover:bg-teal-800'
  const showResults = result && result.characters.length === 1
  const survival =
    result && result.characters[0] && result.characters[0].healthRemaining > 0

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer rounded-md px-4 py-2 select-none ${hoverColor} ${cardColor}`}
      onClick={onSelect}
    >
      <div className="flex gap-2 items-center basis-[200px] whitespace-nowrap">
        <a
          key={ability.name}
          className="min-w-[30px]"
          href={ability.wowheadLink}
          onClick={(e) => {
            e.preventDefault()
            onSelect?.()
          }}
        >
          <Image
            className="rounded border border-gray-500"
            height={30}
            width={30}
            src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
            alt={ability.name}
          />
        </a>
        <div className="text-white">{ability.name}</div>
      </div>
      <div className="flex justify-between grow gap-2">
        <div className="flex gap-2">
          <AbilityDetailsChip
            color="bg-gray-500"
            className="hidden sm:block"
            data-tooltip-id={`chip-damage-${ability.name}`}
          >
            {ability.baseDamage.toLocaleString('en-us')} dmg
            {ability.variance && ` ±${ability.variance * 100}%`}
          </AbilityDetailsChip>
          {ability.variance && (
            <TooltipStyled id={`chip-damage-${ability.name}`}>
              <p>Some abilities have variance in their damage.</p>
              <p>
                Not Even Close assumes you will take the upper bound of this variance.
              </p>
            </TooltipStyled>
          )}
          <AbilityDetailsChip
            color={ability.isAoe ? 'bg-amber-600' : 'bg-pink-700'}
            className="hidden sm:block"
          >
            {ability.isAoe ? 'AoE' : 'Single'}
          </AbilityDetailsChip>
          <AbilityDetailsChip
            color={ability.isPhysical ? 'bg-orange-800' : 'bg-blue-500'}
            className="hidden sm:block"
          >
            {ability.isPhysical ? 'Physical' : 'Magic'}
          </AbilityDetailsChip>
        </div>
        {showResults &&
          (survival ? (
            <AbilityDetailsChip color="bg-green-500" textColor="text-black">
              You live
            </AbilityDetailsChip>
          ) : (
            <AbilityDetailsChip color="bg-red-600">You die</AbilityDetailsChip>
          ))}
      </div>
    </div>
  )
}
