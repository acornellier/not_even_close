import { Character, Profile } from '../../backend/characters'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { defaultAbilities, equalSpecs } from '../../backend/classes'
import { tepidVersatility } from '../../backend/groupAbilities/externals'
import { isAbilitySelected } from '../../backend/utils'
import { Ability } from '../../backend/ability'

const uniqueAbilityNames = ['ursine vigor']
const uniqueExternalNames = ['phial']

function uniqueAbilities(abilities: Ability[], uniqueNames: string[]) {
  for (const uniqueName of uniqueNames) {
    let lastIndex = abilities.findLastIndex((ability) =>
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
}

export function useCharacterChanges({ setCharacters, setProfiles, characters }: Props) {
  const updateCharacterIdx = useCallback(
    (index: number) =>
      (charChanges: Partial<Character>, addTepidVers = false) => {
        setCharacters((characters) =>
          characters.map((character, index2) => {
            if (index2 !== index) return character

            let specChangeChanges =
              charChanges.classSpec &&
              !equalSpecs(character.classSpec, charChanges.classSpec)
                ? {
                    abilities: defaultAbilities(charChanges.classSpec),
                    externals: addTepidVers ? [tepidVersatility] : [],
                  }
                : {}

            const res = {
              ...character,
              ...charChanges,
              ...specChangeChanges,
            }

            if (addTepidVers) {
              res.externals ??= []

              if (!isAbilitySelected(tepidVersatility.spellId, res.externals)) {
                res.externals.push(tepidVersatility)
              }
            }

            res.abilities = uniqueAbilities(res.abilities, uniqueAbilityNames)
            res.externals = uniqueAbilities(res.externals, uniqueExternalNames)

            return res
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
