import { useLocalStorage } from '../../util/useLocalStorage.ts'
import { defaultCharacters } from './defaultCharacters.ts'
import type { Character, OldCharacter } from '../../backend/characters.ts'
import type { Ability, SelectedAbility } from '../../backend/ability.ts'

const defaultGroupBuffs: SelectedAbility[] = []
const defaultGroupActives: SelectedAbility[] = []

export function useAbilities() {
  // TODO: reset cache and remove this in TWW
  convertOldTypes()

  const [characters, setCharacters] = useLocalStorage<Character[]>(
    'characters',
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

const convertAbilities = (abilities: Ability[] | SelectedAbility[]) =>
  abilities.map<SelectedAbility>((ability) =>
    'ability' in ability ? ability : { ability },
  )

let checkedOldValues = false
function convertOldTypes() {
  if (checkedOldValues) return
  checkedOldValues = true

  if (localStorage.getItem('converted_old_ability_types')) return

  const charactersStr = localStorage.getItem('characters')
  if (charactersStr) {
    const oldCharacters: Character[] | OldCharacter[] = JSON.parse(charactersStr)
    const newCharacters = oldCharacters.map<Character>((character) => ({
      ...character,
      abilities: convertAbilities(character.abilities),
      externals: convertAbilities(character.externals),
    }))
    localStorage.setItem('characters', JSON.stringify(newCharacters))
  }

  const groupBuffsStr = localStorage.getItem('groupBuffs')
  if (groupBuffsStr) {
    const oldGroupBuffs: Ability[] | SelectedAbility[] = JSON.parse(groupBuffsStr)
    const newGroupBuffs = convertAbilities(oldGroupBuffs)
    localStorage.setItem('groupBuffs', JSON.stringify(newGroupBuffs))
  }

  const groupActivesStr = localStorage.getItem('groupActives')
  if (groupActivesStr) {
    const oldGroupActives: Ability[] | SelectedAbility[] = JSON.parse(groupActivesStr)
    const newGroupActives = convertAbilities(oldGroupActives)
    localStorage.setItem('groupActives', JSON.stringify(newGroupActives))
  }

  localStorage.setItem('converted_old_ability_types', 'true')
}
