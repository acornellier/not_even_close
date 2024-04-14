import {
  AbilityCombo,
  Character,
  CharacterChanges,
  Profile,
} from '../../backend/characters'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { defaultAbilities, equalSpecs } from '../../backend/classes'
import { tepidVersatility } from '../../backend/groupAbilities/externals'
import { isAbilitySelected } from '../../backend/utils'
import { Ability } from '../../backend/ability'

const uniqueAbilityNames = ['ursine vigor']
const uniqueExternalNames = ['phial']

function uniqueAbilities(abilities: Ability[], uniqueNames: string[]) {
  for (const uniqueName of uniqueNames) {
    const lastIndex = abilities.findLastIndex((ability) =>
      ability.name.toLowerCase().includes(uniqueName),
    )

    if (lastIndex !== -1) {
      abilities = abilities.filter(
        (ability, idx) =>
          idx === lastIndex || !ability.name.toLowerCase().includes(uniqueName),
      )
    }
  }

  return abilities
}

interface Props {
  setCharacters: Dispatch<SetStateAction<Character[]>>
  setProfiles: Dispatch<SetStateAction<Profile[]>>
  characters: Character[]
  selectedCombo: number
}

export function useCharacterChanges({
  setCharacters,
  setProfiles,
  characters,
  selectedCombo,
}: Props) {
  const updateCharacter = useCallback(
    ({ charIndex, charChanges, comboChanges, addTepidVers }: CharacterChanges) => {
      setCharacters((characters) => {
        return characters.map((prevChar, index2) => {
          if (index2 !== charIndex) return prevChar

          const combo: AbilityCombo = {
            ...prevChar.abilityCombos[selectedCombo]!,
            ...comboChanges,
          }

          if (
            charChanges?.classSpec &&
            !equalSpecs(prevChar.classSpec, charChanges.classSpec)
          ) {
            combo.abilities = defaultAbilities(charChanges.classSpec)
            combo.externals = addTepidVers ? [tepidVersatility] : []
          }

          if (addTepidVers) {
            combo.externals ??= []

            if (!isAbilitySelected(tepidVersatility.id, combo.externals)) {
              combo.externals.push(tepidVersatility)
            }
          }

          combo.abilities = uniqueAbilities(combo.abilities, uniqueAbilityNames)
          combo.externals = uniqueAbilities(combo.externals, uniqueExternalNames)

          const newChar: Character = { ...prevChar, ...charChanges }
          newChar.abilityCombos[selectedCombo] = combo
          return newChar
        })
      })

      if (charChanges?.loadedProfileId) return

      setProfiles((profiles) =>
        profiles.map((profile) =>
          profile.id === characters[charIndex]!.loadedProfileId
            ? {
                ...profile,
                ...(charChanges?.classSpec ? { classSpec: charChanges?.classSpec } : {}),
                ...(charChanges?.stats ? { stats: charChanges?.stats } : {}),
              }
            : profile,
        ),
      )
    },
    [characters, setCharacters, setProfiles, selectedCombo],
  )

  const removeCharacter = useCallback(
    (index: number) =>
      setCharacters((characters) => characters.filter((_, index2) => index2 !== index)),
    [setCharacters],
  )

  const createProfile = useCallback(
    (charIndex: number, name: string) => {
      const id = crypto.randomUUID()
      setProfiles((profiles) => [
        ...profiles,
        {
          id,
          name,
          classSpec: characters[charIndex]!.classSpec,
          stats: characters[charIndex]!.stats,
        },
      ])
      updateCharacter({ charIndex, charChanges: { loadedProfileId: id } })
    },
    [characters, setProfiles, updateCharacter],
  )

  const loadProfile = useCallback(
    (charIndex: number, profile: Profile | null) => {
      if (profile === null) {
        updateCharacter({ charIndex, charChanges: { loadedProfileId: undefined } })
      } else {
        updateCharacter({
          charIndex,
          charChanges: {
            classSpec: profile.classSpec,
            stats: profile.stats,
            loadedProfileId: profile.id,
          },
        })
      }
    },
    [updateCharacter],
  )

  const deleteProfile = useCallback(
    (profileId: string) => {
      setProfiles((profiles) => profiles.filter((profile) => profile.id !== profileId))
    },
    [setProfiles],
  )

  return {
    updateCharacter,
    removeCharacter,
    createProfile,
    loadProfile,
    deleteProfile,
  }
}
