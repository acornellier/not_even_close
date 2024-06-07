import type { SelectedAbilityId } from '../../backend/ability.ts'
import { abilitiesById } from '../../backend/ability.ts'
import { useEffect } from 'react'

export function useAbilitiesThatExist(
  abilities: SelectedAbilityId[],
  setAbilities: (abilities: SelectedAbilityId[]) => void,
) {
  useEffect(() => {
    const abilitiesThatExist = abilities.filter(
      ({ abilityId }) => !!abilitiesById[abilityId],
    )
    if (abilitiesThatExist.length < abilities.length) {
      setAbilities(abilitiesThatExist)
    }
  }, [abilities, setAbilities])
}
