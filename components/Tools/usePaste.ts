import { useCallback, useEffect } from 'react'
import { getAddonOutput, isAddonPaste } from './addon'
import { Ability } from '../../backend/ability'
import { Character, UpdateCharacter } from '../../backend/characters'

interface Props {
  updateCharacterIdx: (index: number) => UpdateCharacter
  selectedGroupBuffs: Ability[]
  setGroupBuffs: (abilities: Ability[]) => void
}

export function usePaste({
  updateCharacterIdx,
  selectedGroupBuffs,
  setGroupBuffs,
}: Props) {
  const handlePaste = useCallback(
    async (text: string, characterIdx: number) => {
      if (!isAddonPaste(text)) return

      const { character, groupBuffs: newGroupBuffs } = getAddonOutput(text)

      updateCharacterIdx(characterIdx)(character)

      setGroupBuffs([
        ...selectedGroupBuffs,
        ...newGroupBuffs.filter(
          (newBuff) =>
            !selectedGroupBuffs.some((curBuff) => curBuff.spellId === newBuff.spellId)
        ),
      ])
    },
    [updateCharacterIdx, selectedGroupBuffs, setGroupBuffs]
  )

  const pasteWithButton = useCallback(
    (characterIdx: number) => async () => {
      const text = await navigator.clipboard.readText()
      await handlePaste(text, characterIdx)
    },
    [handlePaste]
  )

  const handleGlobalPaste = useCallback(
    async (event: any) => {
      if (!event.clipboardData) return

      await handlePaste(event.clipboardData.getData('text'), 0)
    },
    [handlePaste]
  )

  useEffect(() => {
    window.addEventListener('paste', handleGlobalPaste)
    return () => {
      window.removeEventListener('paste', handleGlobalPaste)
    }
  }, [handleGlobalPaste])

  return pasteWithButton
}
