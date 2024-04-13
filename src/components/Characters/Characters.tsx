import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { Character, Profile } from '../../backend/characters'
import { CharacterComponent } from './CharacterComponent'
import { usePaste } from '../../util/usePaste'
import { Ability } from '../../backend/ability'
import { useLocalStorage } from '../../util/useLocalStorage'
import { useCharacterChanges } from './useCharacterChanges'
import { defaultCharacters } from './useAbilities.ts'

interface Props {
  characters: Character[]
  setCharacters: Dispatch<SetStateAction<Character[]>>
  selectedGroupBuffs: Ability[]
  setGroupBuffs: (abilities: Ability[]) => void
  selectedCombo: number
}

const defaultProfiles: Profile[] = []

export function Characters({
  characters,
  setCharacters,
  selectedGroupBuffs,
  setGroupBuffs,
  selectedCombo,
}: Props) {
  const [profiles, setProfiles] = useLocalStorage<Profile[]>('profiles', defaultProfiles)

  useEffect(() => {
    if (characters.length === 0) setCharacters(defaultCharacters)
  }, [characters, setCharacters])

  const { updateCharacter, removeCharacter, createProfile, deleteProfile, loadProfile } =
    useCharacterChanges({
      setCharacters,
      setProfiles,
      characters,
      selectedCombo,
    })

  const handlePaste = usePaste({
    updateCharacter,
    selectedGroupBuffs,
    setGroupBuffs,
  })

  return (
    <>
      {characters.map((character, idx) => (
        <Fragment key={idx}>
          <CharacterComponent
            charIndex={idx}
            character={character}
            profiles={profiles}
            selectedCombo={selectedCombo}
            updateCharacter={updateCharacter}
            canRemove={characters.length > 1}
            removeCharacter={removeCharacter}
            handlePaste={handlePaste}
            createProfile={createProfile}
            loadProfile={loadProfile}
            deleteProfile={deleteProfile}
          />
          {characters.length > 1 && <div className="border-2 w-full border-gray-600" />}
        </Fragment>
      ))}
    </>
  )
}
