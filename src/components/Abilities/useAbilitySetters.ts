import { useCallback, useEffect } from 'react'
import {
  defaultStacks,
  findMatchingAbility,
  getSelectedAbility,
  isAbilityAvailable,
  isAbilitySelected,
} from '../../util/utils.ts'
import type { Ability, SelectedAbilityId } from '../../backend/ability.ts'

interface Props {
  availableAbilities: Ability[]
  selectedAbilities: SelectedAbilityId[]
  setSelectedAbilities: (abilities: SelectedAbilityId[]) => void
}

export function useAbilitySetters({
  selectedAbilities,
  availableAbilities,
  setSelectedAbilities,
}: Props) {
  useEffect(() => {
    // Filter to available abilities
    if (
      selectedAbilities.some(
        ({ abilityId }) => !isAbilityAvailable(abilityId, availableAbilities),
      )
    ) {
      setSelectedAbilities(
        selectedAbilities.filter((selectedAbility) =>
          isAbilityAvailable(selectedAbility.abilityId, availableAbilities),
        ),
      )

      return
    }

    // Ensure stacks are set
    if (
      selectedAbilities.some(
        ({ abilityId, stacks }) =>
          stacks === undefined &&
          findMatchingAbility(abilityId, availableAbilities)?.stacks,
      )
    ) {
      setSelectedAbilities(
        selectedAbilities.map((selectedAbility) => {
          const matchingAbility = findMatchingAbility(
            selectedAbility.abilityId,
            availableAbilities,
          )

          if (selectedAbility.stacks || !matchingAbility?.stacks) return selectedAbility

          return {
            abilityId: selectedAbility.abilityId,
            stacks: defaultStacks(matchingAbility.stacks),
          }
        }),
      )
    }
  }, [availableAbilities, selectedAbilities, setSelectedAbilities])

  const toggleAbility = useCallback(
    (abilityId: number) => {
      if (isAbilitySelected(abilityId, selectedAbilities)) {
        setSelectedAbilities(
          selectedAbilities.filter(
            (selectedAbility) => selectedAbility.abilityId !== abilityId,
          ),
        )
      } else {
        const ability = availableAbilities.find(
          ({ id: otherSpellId }) => otherSpellId === abilityId,
        )

        if (!ability) return

        const { stacks } = ability

        setSelectedAbilities([
          ...selectedAbilities,
          {
            abilityId: ability.id,
            ...(stacks ? { stacks: defaultStacks(stacks) } : {}),
          },
        ])
      }
    },
    [availableAbilities, selectedAbilities, setSelectedAbilities],
  )

  const setAbilityStacks = useCallback(
    (spellId: number, stacks: number) => {
      const selectedAbility = getSelectedAbility(spellId, selectedAbilities)

      if (!selectedAbility) return

      setSelectedAbilities([
        ...selectedAbilities.filter(
          (selectedAbility) => selectedAbility.abilityId !== spellId,
        ),
        { ...selectedAbility, stacks },
      ])
    },
    [selectedAbilities, setSelectedAbilities],
  )

  return { toggleAbility, setAbilityStacks }
}
