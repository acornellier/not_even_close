import { useCallback, useEffect } from 'react'
import { getAddonOutput, isAddonPaste } from './addon'
import { Ability } from '../../backend/ability'
import { Character } from '../../backend/characterStats'

interface Props {
  characters: Character[]
  setCharacterIdx: (index: number) => (character: Character) => void
  selectedGroupBuffs: Ability[]
  setGroupBuffs: (abilities: Ability[]) => void
}

export function usePaste({
  characters,
  setCharacterIdx,
  selectedGroupBuffs,
  setGroupBuffs,
}: Props) {
  const handlePaste = useCallback(
    async (text: string, characterIdx: number) => {
      console.log(text)

      if (!isAddonPaste(text)) return

      const { character, groupBuffs: newGroupBuffs } = getAddonOutput(
        text,
        characters[characterIdx]
      )

      setCharacterIdx(characterIdx)(character)
      setGroupBuffs([
        ...selectedGroupBuffs,
        ...newGroupBuffs.filter(
          (newBuff) =>
            !selectedGroupBuffs.some((curBuff) => curBuff.spellId === newBuff.spellId)
        ),
      ])
    },
    [characters, setCharacterIdx, selectedGroupBuffs, setGroupBuffs]
  )

  const pasteWithButton = useCallback(
    async (characterIdx: number) => {
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
    [characters, handlePaste]
  )

  useEffect(() => {
    window.addEventListener('paste', handleGlobalPaste)
    return () => {
      window.removeEventListener('paste', handleGlobalPaste)
    }
  }, [handleGlobalPaste])

  return pasteWithButton
}
