import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { Character, Profile } from '../../backend/characters'
import { CharacterComponent } from './CharacterComponent'
import { usePaste } from '../../util/usePaste'
import { Ability } from '../../backend/ability'
import { useLocalStorage } from '../../util/useLocalStorage'
import { useCharacterChanges } from './useCharacterChanges'
import { defaultCharacters } from './defaultCharacters.ts'

interface Props {
  characters: Character[]
  setCharacters: Dispatch<SetStateAction<Character[]>>
  selectedGroupBuffs: Ability[]
  setGroupBuffs: Dispatch<SetStateAction<Ability[]>>
}

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
          {characters.length > 1 && <div className="border-2 w-full border-gray-600" />}
        </Fragment>
      ))}
    </>
  )
}
