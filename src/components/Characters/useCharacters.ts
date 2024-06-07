import { useLocalStorage } from '../../util/useLocalStorage.ts'
import { defaultCharacters } from './defaultCharacters.ts'
import type { Character } from '../../backend/characters.ts'
import type { SelectedAbilityId } from '../../backend/ability.ts'
import { useAbilitiesThatExist } from './useAbilitiesThatExist.ts'

const defaultGroupBuffs: SelectedAbilityId[] = []
const defaultGroupActives: SelectedAbilityId[] = []

export function useCharacters() {
  const [characters, setCharacters] = useLocalStorage<Character[]>(
    'characters_tww',
    defaultCharacters,
  )

  // Character abilities are filtered in CharacterComponent.tsx

  const [selectedGroupBuffs, setGroupBuffs] = useLocalStorage<SelectedAbilityId[]>(
    'groupBuffs',
    defaultGroupBuffs,
  )

  useAbilitiesThatExist(selectedGroupBuffs, setGroupBuffs)

  const [selectedGroupActives, setGroupActives] = useLocalStorage<SelectedAbilityId[]>(
    'groupActives',
    defaultGroupActives,
  )

  useAbilitiesThatExist(selectedGroupActives, setGroupActives)

  return {
    characters,
    setCharacters,
    selectedGroupBuffs,
    setGroupBuffs,
    selectedGroupActives,
    setGroupActives,
  } as const
}
