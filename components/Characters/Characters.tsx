import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { Character, Profile } from '../../backend/characters'
import { CharacterComponent } from './CharacterComponent'
import { usePaste } from '../Tools/usePaste'
import { ClassSpec, defaultAbilities } from '../../backend/classes'
import { Ability } from '../../backend/ability'
import useLocalStorage from '../Tools/useLocalStorage'
import { useCharacterChanges } from './useCharacterChanges'

interface Props {
  characters: Character[]
  setCharacters: Dispatch<SetStateAction<Character[]>>
  selectedGroupBuffs: Ability[]
  setGroupBuffs: Dispatch<SetStateAction<Ability[]>>
}

const defaultClassSpec: ClassSpec = { class: 'Monk', spec: 'Mistweaver' }
export const defaultCharacter: Character = {
  classSpec: defaultClassSpec,
  stats: {
    stamina: 41_000,
    versatilityRaw: 1000,
    avoidanceRaw: 325,
  },
  abilities: defaultAbilities(defaultClassSpec),
  externals: [],
}

export const defaultCharacters = [defaultCharacter]
const defaultProfiles: Profile[] = []

export function Characters({
  characters,
  setCharacters,
  selectedGroupBuffs,
  setGroupBuffs,
}: Props) {
  const [profiles, setProfiles] = useLocalStorage<Profile[]>('profiles', defaultProfiles)

  useEffect(() => {
    if (characters.length === 0) setCharacters(defaultCharacters)
  }, [characters, setCharacters])

  const {
    updateCharacterIdx,
    removeCharacterIdx,
    createProfileIdx,
    deleteProfile,
    loadProfileIdx,
  } = useCharacterChanges({
    setCharacters,
    setProfiles,
    characters,
  })

  const handlePaste = usePaste({
    updateCharacterIdx,
    selectedGroupBuffs,
    setGroupBuffs,
  })

  return (
    <>
      {characters.map((character, idx) => (
        <Fragment key={idx}>
          <CharacterComponent
            idx={idx}
            character={character}
            profiles={profiles}
            updateCharacter={updateCharacterIdx(idx)}
            canRemove={characters.length > 1}
            removeCharacter={removeCharacterIdx(idx)}
            handlePaste={handlePaste(idx)}
            saveProfile={createProfileIdx(idx)}
            loadProfile={loadProfileIdx(idx)}
            deleteProfile={deleteProfile}
          />
          {characters.length > 1 && (
            <div className="border-2 w-full dark:border-gray-600" />
          )}
        </Fragment>
      ))}
    </>
  )
}
