import { useLocalStorage } from '../../util/useLocalStorage.ts'
import { defaultCharacters } from './defaultCharacters.ts'
import type { Character } from '../../backend/characters.ts'
import type { SelectedAbility } from '../../backend/ability.ts'

const defaultGroupBuffs: SelectedAbility[] = []
const defaultGroupActives: SelectedAbility[] = []

export function useAbilities() {
  const [characters, setCharacters] = useLocalStorage<Character[]>(
    'characters_tww',
    defaultCharacters,
  )

  const [selectedGroupBuffs, setGroupBuffs] = useLocalStorage<SelectedAbility[]>(
    'groupBuffs',
    defaultGroupBuffs,
  )

  const [selectedGroupActives, setGroupActives] = useLocalStorage<SelectedAbility[]>(
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
