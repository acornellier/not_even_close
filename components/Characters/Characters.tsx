import { Dispatch, Fragment, SetStateAction, useCallback, useEffect } from 'react'
import { Character, Profile } from '../../backend/characters'
import { CharacterComponent } from './CharacterComponent'
import { usePaste } from '../Tools/usePaste'
import { ClassSpec, defaultAbilities } from '../../backend/classes'
import { Ability } from '../../backend/ability'
import useLocalStorage from '../Tools/useLocalStorage'

interface Props {
  characters: Character[]
  setCharacters: Dispatch<SetStateAction<Character[]>>
  selectedGroupBuffs: Ability[]
  setGroupBuffs: Dispatch<SetStateAction<Ability[]>>
}

const defaultClassSpec: ClassSpec = { class: 'Monk', spec: 'Mistweaver' }
export const defaultCharacter: Character = {
  classSpec: defaultClassSpec,
  stats: { stamina: 41_000, versatilityPercent: 5, avoidancePercent: 4.51 },
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

  const updateCharacterIdx = useCallback(
    (index: number) => (charChanges: Partial<Character>) => {
      setCharacters((characters) =>
        characters.map((character, index2) => {
          if (index2 !== index) return character

          return {
            ...character,
            ...charChanges,
            ...(charChanges.classSpec && charChanges.classSpec !== character.classSpec
              ? { abilities: defaultAbilities(charChanges.classSpec), externals: [] }
              : {}),
          }
        })
      )

      if (charChanges.loadedProfileId) return

      setProfiles((profiles) =>
        profiles.map((profile) =>
          profile.id === characters[index].loadedProfileId
            ? {
                ...profile,
                ...(charChanges.classSpec ? { classSpec: charChanges.classSpec } : {}),
                ...(charChanges.stats ? { stats: charChanges.stats } : {}),
              }
            : profile
        )
      )
    },
    [characters, setCharacters, setProfiles]
  )

  const removeCharacterIdx = useCallback(
    (index: number) => () =>
      setCharacters((characters) => characters.filter((_, index2) => index2 !== index)),
    [setCharacters]
  )

  const createProfileIdx = useCallback(
    (characterIdx: number) => (name: string) => {
      const id = crypto.randomUUID()
      setProfiles((profiles) => [
        ...profiles,
        {
          id,
          name,
          classSpec: characters[characterIdx].classSpec,
          stats: characters[characterIdx].stats,
        },
      ])
      updateCharacterIdx(characterIdx)({ loadedProfileId: id })
    },
    [characters, setProfiles, updateCharacterIdx]
  )

  const loadProfileIdx = useCallback(
    (index: number) => (profile: Profile | null) => {
      if (profile === null) {
        updateCharacterIdx(index)({ loadedProfileId: undefined })
      } else {
        updateCharacterIdx(index)({
          classSpec: profile.classSpec,
          stats: profile.stats,
          loadedProfileId: profile.id,
        })
      }
    },
    [updateCharacterIdx]
  )

  const deleteProfile = useCallback(
    (profileId: string) => {
      setProfiles((profiles) => profiles.filter((profile) => profile.id !== profileId))
    },
    [setProfiles]
  )

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
