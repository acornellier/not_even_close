import { useEffect } from 'react'

export const useKeyboardShortcut = (keys: string[][], callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        keys.some((keyCombo) =>
          keyCombo.every(
            (key) =>
              (key === 'ctrl' && event.ctrlKey) ||
              (key === 'shift' && event.shiftKey) ||
              (key === 'alt' && event.altKey) ||
              (key === 'meta' && event.metaKey) ||
              event.key.toLowerCase() === key
          )
        )
      ) {
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keys, callback])
}
