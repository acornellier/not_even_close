import { useCallback, useEffect } from 'react'
import { getAddonOutput, isAddonPaste } from './addon'
import { Ability } from '../../backend/ability'
import { UpdateCharacter } from '../../backend/characters'
import { useToasts } from '../Common/Toasts/useToasts'

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
  const { addToast } = useToasts()

  const handlePaste = useCallback(
    async (text: string, characterIdx: number) => {
      if (!isAddonPaste(text)) {
        addToast({ message: 'Invalid paste.', type: 'error' })
        return
      }

      const { character, groupBuffs, addTepidVers } = getAddonOutput(text)

      updateCharacterIdx(characterIdx)(character, addTepidVers)

      setGroupBuffs([
        ...selectedGroupBuffs,
        ...groupBuffs.filter(
          (newBuff) =>
            !selectedGroupBuffs.some((curBuff) => curBuff.spellId === newBuff.spellId)
        ),
      ])

      addToast({ message: 'Paste success.', type: 'success' })
    },
    [updateCharacterIdx, setGroupBuffs, selectedGroupBuffs, addToast]
  )

  const pasteWithButton = useCallback(
    (characterIdx: number) => async (text: string) => {
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
