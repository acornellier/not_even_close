import Image from 'next/image'
import { Ability } from '../backend/ability'
import { Tooltip } from 'react-tooltip'

interface Props {
  allAbilities: Ability[]
  selectedAbilities: Ability[]
  setSelectedAbilities: (abilities: Ability[]) => void
}

const iconSize = 40

export function AbilitySelect({
  allAbilities,
  selectedAbilities,
  setSelectedAbilities,
}: Props) {
  const isAbilitySelected = (ability: Ability) =>
    selectedAbilities.some(
      (selectedAbility) => selectedAbility.spellId === ability.spellId
    )

  const toggleAbility = (ability: Ability) => {
    const isSelected = isAbilitySelected(ability)

    if (isSelected) {
      setSelectedAbilities(
        selectedAbilities.filter(
          (selectedAbility) => selectedAbility.spellId !== ability.spellId
        )
      )
    } else {
      setSelectedAbilities([...selectedAbilities, ability])
    }
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {allAbilities.map((ability) => (
        <div
          key={ability.spellId}
          data-tooltip-id={`ability-tooltip-${ability.spellId}`}
          className="cursor-pointer select-none"
          onClick={(e) => {
            e.preventDefault()
            toggleAbility(ability)
          }}
        >
          <Tooltip
            id={`ability-tooltip-${ability.spellId}`}
            opacity={1}
            place="right"
            style={{ zIndex: 100 }}
          >
            <div className="flex flex-col">
              <span className="text-xl">{ability.name}</span>
              {ability.dr && <span>{ability.dr * 100}% DR</span>}
              {ability.aoeDr && <span>{ability.aoeDr * 100}% AoE DR</span>}
              {ability.healthIncrease && (
                <span>{ability.healthIncrease * 100}% HP</span>
              )}
              {ability.staminaIncrease && (
                <span>{ability.staminaIncrease * 100}% stamina</span>
              )}
              {ability.versIncrease && (
                <span>{ability.versIncrease * 100}% versatility</span>
              )}
              {ability.absorbHealthMultiplier && (
                <span>{ability.absorbHealthMultiplier * 100}% HP absorb</span>
              )}
              {ability.rawAbsorb && <span>{ability.rawAbsorb} HP</span>}
              {ability.notes && <span>{ability.notes}</span>}
            </div>
          </Tooltip>
          {isAbilitySelected(ability) && (
            <svg
              className="absolute"
              xmlns="http://www.w3.org/2000/svg"
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
            >
              <path
                fill="green"
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
              />
            </svg>
          )}
          <Image
            className="rounded border-2 border-gray-500"
            height={iconSize}
            width={iconSize}
            src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
            alt={ability.name}
          />
        </div>
      ))}
    </div>
  )
}
