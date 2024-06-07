import { useLocalStorage } from '../../util/useLocalStorage.ts'
import { defaultCharacters } from './defaultCharacters.ts'
import type { Character } from '../../backend/characters.ts'
import type { SelectedAbilityId } from '../../backend/ability.ts'

const defaultGroupBuffs: SelectedAbilityId[] = []
const defaultGroupActives: SelectedAbilityId[] = []

export function useAbilities() {
  const [characters, setCharacters] = useLocalStorage<Character[]>(
    'characters_tww',
    defaultCharacters,
  )

  const [selectedGroupBuffs, setGroupBuffs] = useLocalStorage<SelectedAbilityId[]>(
    'groupBuffs',
    defaultGroupBuffs,
  )

  const [selectedGroupActives, setGroupActives] = useLocalStorage<SelectedAbilityId[]>(
    'groupActives',
    defaultGroupActives,
  )

  return {
    characters,
    setCharacters,
    selectedGroupBuffs,
    setGroupBuffs,
    selectedGroupActives,
    setGroupActives,
  } as const
}
