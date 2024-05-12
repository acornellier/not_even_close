import type { Ability } from '../../backend/ability'
import { abilityEffectFields } from '../../backend/ability'
import {
  augmentAbilities,
  isAbilityAvailable,
  isAbilitySelected,
} from '../../backend/utils'
import { CharAbilityIcon } from './CharAbilityIcon'
import { useCallback, useEffect } from 'react'
import { dampenHarm } from '../../backend/classAbilities/monk.ts'
import { willOfTheNecropolis } from '../../backend/classAbilities/deathKnight.ts'

interface Props {
  availableAbilities: Ability[]
  selectedAbilities: Ability[]
  setSelectedAbilities: (abilities: Ability[]) => void
  characterIdx?: number
}

function isAugmenter(ability: Ability) {
  if ([dampenHarm.spellId, willOfTheNecropolis.spellId].includes(ability.spellId))
    return false

  return !abilityEffectFields.some((field) => ability[field])
}

export function AbilitySelect({
  availableAbilities,
  selectedAbilities,
  setSelectedAbilities,
  characterIdx,
}: Props) {
  useEffect(() => {
    if (
      selectedAbilities.some(
        (selectedAbility) => !isAbilityAvailable(selectedAbility, availableAbilities),
      )
    ) {
      setSelectedAbilities(
        selectedAbilities.filter((selectedAbility) =>
          isAbilityAvailable(selectedAbility, availableAbilities),
        ),
      )
    }
  }, [availableAbilities, selectedAbilities, setSelectedAbilities])

  const augmentedAbilities = augmentAbilities(availableAbilities, selectedAbilities)

  const toggleAbility = useCallback(
    (spellId: number) => {
      if (isAbilitySelected(spellId, selectedAbilities)) {
        setSelectedAbilities(
          selectedAbilities.filter(
            (selectedAbility) => selectedAbility.spellId !== spellId,
          ),
        )
      } else {
        const ability = availableAbilities.find(
          ({ spellId: otherSpellId }) => otherSpellId === spellId,
        )

        if (ability) setSelectedAbilities([...selectedAbilities, ability])
      }
    },
    [availableAbilities, selectedAbilities, setSelectedAbilities],
  )

  const [augmenters, regulars] = (augmentedAbilities ?? availableAbilities).reduce<
    [Ability[], Ability[]]
  >(
    (acc, ability) => {
      acc[isAugmenter(ability) ? 0 : 1].push(ability)
      return acc
    },
    [[], []],
  )

  return (
    <div className="flex gap-1.5 flex-wrap">
      {augmenters.map((ability) => (
        <CharAbilityIcon
          key={ability.spellId}
          ability={ability}
          toggleAbility={toggleAbility}
          selectedAbilities={selectedAbilities}
          allAbilities={availableAbilities}
          characterIdx={characterIdx}
        />
      ))}

      {augmenters.length > 0 && <div className="border-2 border-gray-300" />}

      {regulars.map((ability) => (
        <CharAbilityIcon
          key={ability.spellId}
          ability={ability}
          toggleAbility={toggleAbility}
          selectedAbilities={selectedAbilities}
          allAbilities={availableAbilities}
          characterIdx={characterIdx}
        />
      ))}
    </div>
  )
}
