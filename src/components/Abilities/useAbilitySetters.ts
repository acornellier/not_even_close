import { useCallback, useEffect } from 'react'
import {
  defaultStacks,
  findMatchingAbility,
  getSelectedAbility,
  isAbilityAvailable,
  isAbilitySelected,
} from '../../util/utils.ts'
import type { Ability, SelectedAbility } from '../../backend/ability.ts'

interface Props {
  availableAbilities: Ability[]
  selectedAbilities: SelectedAbility[]
  setSelectedAbilities: (abilities: SelectedAbility[]) => void
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
        ({ ability }) => !isAbilityAvailable(ability, availableAbilities),
      )
    ) {
      setSelectedAbilities(
        selectedAbilities.filter((selectedAbility) =>
          isAbilityAvailable(selectedAbility.ability, availableAbilities),
        ),
      )

      return
    }

    // Ensure stacks are set
    if (
      selectedAbilities.some(
        ({ ability, stacks }) =>
          stacks === undefined &&
          findMatchingAbility(ability.id, availableAbilities)?.stacks,
      )
    ) {
      setSelectedAbilities(
        selectedAbilities.map((selectedAbility) => {
          const matchingAbility = findMatchingAbility(
            selectedAbility.ability.id,
            availableAbilities,
          )

          if (selectedAbility.stacks || !matchingAbility?.stacks) return selectedAbility

          return {
            ability: selectedAbility.ability,
            stacks: defaultStacks(matchingAbility.stacks),
          }
        }),
      )
    }
  }, [availableAbilities, selectedAbilities, setSelectedAbilities])

  const toggleAbility = useCallback(
    (spellId: number) => {
      if (isAbilitySelected(spellId, selectedAbilities)) {
        setSelectedAbilities(
          selectedAbilities.filter(
            (selectedAbility) => selectedAbility.ability.id !== spellId,
          ),
        )
      } else {
        const ability = availableAbilities.find(
          ({ id: otherSpellId }) => otherSpellId === spellId,
        )

        if (!ability) return

        const { stacks } = ability

        setSelectedAbilities([
          ...selectedAbilities,
          {
            ability,
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
          (selectedAbility) => selectedAbility.ability.id !== spellId,
        ),
        { ...selectedAbility, stacks },
      ])
    },
    [selectedAbilities, setSelectedAbilities],
  )

  return { toggleAbility, setAbilityStacks }
}
