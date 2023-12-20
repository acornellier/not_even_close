import { classAbilities, WowClass } from '../simulator/classes'
import { Ability } from '../simulator/abilities'
import Image from 'next/image'
import { Fragment } from 'react'

interface Props {
  wowClass: WowClass
  selectedAbilities: Ability[]
  setAbilities: (abilities: Ability[]) => void
}

export function AbilitySelect({
  wowClass,
  selectedAbilities,
  setAbilities,
}: Props) {
  const isAbilitySelected = (ability: Ability) =>
    selectedAbilities.some(
      (selectedAbility) => selectedAbility.name === ability.name
    )

  const toggleAbility = (ability: Ability) => {
    if (ability.alwaysOn) return

    const isSelected = isAbilitySelected(ability)

    if (isSelected) {
      setAbilities(
        selectedAbilities.filter(
          (selectedAbility) => selectedAbility.name !== ability.name
        )
      )
    } else {
      setAbilities([...selectedAbilities, ability])
    }
  }

  return (
    <div className="flex gap-2">
      {classAbilities[wowClass].map((ability) => (
        <div
          key={ability.name}
          className="cursor-pointer"
          onClick={() => toggleAbility(ability)}
        >
          {isAbilitySelected(ability) && (
            <svg
              className="absolute"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
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
            height={48}
            width={48}
            src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
            alt={ability.name}
          />
        </div>
      ))}
    </div>
  )
}
