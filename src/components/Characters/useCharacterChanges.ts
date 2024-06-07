import type { Character, Profile } from '../../backend/characters'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'
import { defaultAbilities, equalSpecs } from '../../backend/classes'

interface Props {
  setCharacters: Dispatch<SetStateAction<Character[]>>
  setProfiles: Dispatch<SetStateAction<Profile[]>>
  characters: Character[]
}

export function useCharacterChanges({ setCharacters, setProfiles, characters }: Props) {
  const updateCharacterIdx = useCallback(
    (index: number) => (charChanges: Partial<Character>) => {
      setCharacters((characters) =>
        characters.map((character, index2) => {
          if (index2 !== index) return character

          const specChangeChanges =
            charChanges.classSpec &&
            !equalSpecs(character.classSpec, charChanges.classSpec)
              ? {
                  abilities: defaultAbilities(charChanges.classSpec),
                  externals: [],
                }
              : {}

          return {
            ...character,
            ...charChanges,
            ...specChangeChanges,
          }
        }),
      )

      if (charChanges.loadedProfileId) return

      setProfiles((profiles) =>
        profiles.map((profile) =>
          profile.id === characters[index]!.loadedProfileId
            ? {
                ...profile,
                ...(charChanges.classSpec ? { classSpec: charChanges.classSpec } : {}),
                ...(charChanges.stats ? { stats: charChanges.stats } : {}),
              }
            : profile,
        ),
      )
    },
    [characters, setCharacters, setProfiles],
  )

  const removeCharacterIdx = useCallback(
    (index: number) => () =>
      setCharacters((characters) => characters.filter((_, index2) => index2 !== index)),
    [setCharacters],
  )

  const createProfileIdx = useCallback(
    (characterIdx: number) => (name: string) => {
      const id = crypto.randomUUID()
      setProfiles((profiles) => [
        ...profiles,
        {
          id,
          name,
          classSpec: characters[characterIdx]!.classSpec,
          stats: characters[characterIdx]!.stats,
        },
      ])
      updateCharacterIdx(characterIdx)({ loadedProfileId: id })
    },
    [characters, setProfiles, updateCharacterIdx],
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
    [updateCharacterIdx],
  )

  const deleteProfile = useCallback(
    (profileId: string) => {
      setProfiles((profiles) => profiles.filter((profile) => profile.id !== profileId))
    },
    [setProfiles],
  )

  return {
    updateCharacterIdx,
    removeCharacterIdx,
    createProfileIdx,
    loadProfileIdx,
    deleteProfile,
  }
}
