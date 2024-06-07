import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useEffect } from 'react'
import { getAddonOutput, isAddonPaste } from './addon.ts'
import type { SelectedAbilityId } from '../backend/ability.ts'
import type { Character, UpdateCharacter } from '../backend/characters.ts'
import { useToasts } from '../components/Common/Toasts/useToasts.ts'
import { defaultAbilities, equalSpecs } from '../backend/classes.ts'
import { temperedVersatility } from '../backend/groupAbilities/externals.ts'

interface Props {
  characters: Character[]
  setCharacters: Dispatch<SetStateAction<Character[]>>
  updateCharacterIdx: (index: number) => UpdateCharacter
  selectedGroupBuffs: SelectedAbilityId[]
  setGroupBuffs: (abilities: SelectedAbilityId[]) => void
}

export function usePaste({
  characters,
  setCharacters,
  updateCharacterIdx,
  selectedGroupBuffs,
  setGroupBuffs,
}: Props) {
  const { addToast } = useToasts()

  const handlePaste = useCallback(
    async (text: string, characterIdx: number) => {
      if (!isAddonPaste(text)) {
        addToast({ message: 'Invalid paste.', type: 'error' })
        return
      }

      const addonCharacters = getAddonOutput(text)

      const indexesUpdated = new Set<number>()
      for (const { classSpec, stats, groupBuffs, addTemperedVers } of addonCharacters) {
        const idxToUpdate =
          addonCharacters.length === 1
            ? characterIdx
            : characters.findIndex(
                (char, index) =>
                  equalSpecs(char.classSpec, classSpec) && !indexesUpdated.has(index),
              )

        if (idxToUpdate !== -1) {
          indexesUpdated.add(idxToUpdate)
          updateCharacterIdx(idxToUpdate)(
            { classSpec: classSpec, stats },
            addTemperedVers,
          )

          setGroupBuffs([
            ...selectedGroupBuffs,
            ...groupBuffs
              .filter(
                (newBuff) =>
                  !selectedGroupBuffs.some((curBuff) => curBuff.abilityId === newBuff.id),
              )
              .map<SelectedAbilityId>((ability) => ({ abilityId: ability.id })),
          ])
        } else {
          const newCharacter: Character = {
            classSpec,
            stats,
            abilities: defaultAbilities(classSpec),
            externals: addTemperedVers ? [{ ability: temperedVersatility }] : [],
          }

          setCharacters((prevCharacters) => [...prevCharacters, newCharacter])
        }
      }

      addToast({ message: 'Paste success.', type: 'success' })
    },
    [addToast, characters, updateCharacterIdx, setGroupBuffs, selectedGroupBuffs],
  )

  const pasteWithButton = useCallback(
    (characterIdx: number) => async (text: string) => {
      await handlePaste(text, characterIdx)
    },
    [handlePaste],
  )

  const handleGlobalPaste = useCallback(
    async (event: any) => {
      if (
        !event.clipboardData ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      )
        return

      await handlePaste(event.clipboardData.getData('text'), 0)
    },
    [handlePaste],
  )

  useEffect(() => {
    window.addEventListener('paste', handleGlobalPaste)
    return () => {
      window.removeEventListener('paste', handleGlobalPaste)
    }
  }, [handleGlobalPaste])

  return pasteWithButton
}
