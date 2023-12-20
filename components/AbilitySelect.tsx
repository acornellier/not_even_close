import Image from 'next/image'
import { Ability } from '../backend/ability'

interface Props {
  allAbilities: Ability[]
  selectedAbilities: Ability[]
  setSelectedAbilities: (abilities: Ability[]) => void
}

export function AbilitySelect({
  allAbilities,
  selectedAbilities,
  setSelectedAbilities,
}: Props) {
  const isAbilitySelected = (ability: Ability) =>
    selectedAbilities.some(
      (selectedAbility) => selectedAbility.name === ability.name
    )

  const toggleAbility = (ability: Ability) => {
    if (ability.alwaysOn) return

    const isSelected = isAbilitySelected(ability)

    if (isSelected) {
      setSelectedAbilities(
        selectedAbilities.filter(
          (selectedAbility) => selectedAbility.name !== ability.name
        )
      )
    } else {
      setSelectedAbilities([...selectedAbilities, ability])
    }
  }

  return (
    <div className="flex gap-2">
      {allAbilities.map((ability) => (
        <a
          key={ability.name}
          href={ability.wowheadLink}
          onClick={(e) => {
            e.preventDefault()
            toggleAbility(ability)
          }}
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
        </a>
      ))}
    </div>
  )
}
