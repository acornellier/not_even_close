import { Ability } from '../../backend/ability'
import {
  augmentAbilities,
  isAbilityAvailable,
  isAbilitySelected,
} from '../../backend/utils'
import { AbilityIcon } from './AbilityIcon'
import { Character } from '../../backend/characters'
import { useCallback, useEffect } from 'react'

interface Props {
  availableAbilities: Ability[]
  selectedAbilities: Ability[]
  setSelectedAbilities: (abilities: Ability[]) => void
  character?: Character
}

export function AbilitySelect({
  availableAbilities,
  selectedAbilities,
  setSelectedAbilities,
  character,
}: Props) {
  useEffect(() => {
    if (
      selectedAbilities.some(
        (selectedAbility) => !isAbilityAvailable(selectedAbility, availableAbilities)
      )
    ) {
      setSelectedAbilities(
        selectedAbilities.filter((selectedAbility) =>
          isAbilityAvailable(selectedAbility, availableAbilities)
        )
      )
    }
  }, [availableAbilities, selectedAbilities, setSelectedAbilities])

  const augmentedAbilities = augmentAbilities(availableAbilities, selectedAbilities)

  const toggleAbility = useCallback(
    (spellId: number) => {
      if (isAbilitySelected(spellId, selectedAbilities)) {
        setSelectedAbilities(
          selectedAbilities.filter(
            (selectedAbility) => selectedAbility.spellId !== spellId
          )
        )
      } else {
        const ability = availableAbilities.find(
          ({ spellId: otherSpellId }) => otherSpellId === spellId
        )

        if (ability) setSelectedAbilities([...selectedAbilities, ability])
      }
    },
    [availableAbilities, selectedAbilities, setSelectedAbilities]
  )

  const [augmenters, regulars] = (augmentedAbilities ?? availableAbilities).reduce<
    [Ability[], Ability[]]
  >(
    (acc, ability) => {
      acc[ability.abilityAugmentations ? 0 : 1].push(ability)
      return acc
    },
    [[], []]
  )

  return (
    <div className="flex gap-2 flex-wrap">
      {augmenters.map((ability) => (
        <AbilityIcon
          key={ability.spellId}
          ability={ability}
          toggleAbility={toggleAbility}
          selectedAbilities={selectedAbilities}
          allAbilities={availableAbilities}
          character={character}
        />
      ))}

      {augmenters.length > 0 && <div className="border-2 border-gray-300" />}

      {regulars.map((ability) => (
        <AbilityIcon
          key={ability.spellId}
          ability={ability}
          toggleAbility={toggleAbility}
          selectedAbilities={selectedAbilities}
          allAbilities={availableAbilities}
          character={character}
        />
      ))}
    </div>
  )
}
