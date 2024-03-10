import { ReactNode, useCallback } from 'react'
import { useKeyPress } from '../Tools/useKeyPress'
import { useOutsideClick } from '../Tools/useOutsideClick'

interface Props {
  title: ReactNode
  contents: ReactNode
  buttons: ReactNode
  onConfirm: () => void
  onClose: () => void
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
}

export function Modal({
  title,
  contents,
  buttons,
  onConfirm,
  onClose,
  closeOnEscape,
  closeOnClickOutside,
}: Props) {
  const escapeCallback = useCallback(() => {
    if (closeOnEscape) onClose()
  }, [onClose, closeOnEscape])

  useKeyPress('Enter', onConfirm)
  useKeyPress('Escape', escapeCallback)

  const clickOutsideCallback = useCallback(() => {
    if (closeOnClickOutside) onClose()
  }, [onClose, closeOnClickOutside])

  const ref = useOutsideClick(clickOutsideCallback)

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
      <div className="fixed w-full h-full opacity-80 bg-neutral-800" />
      <div
        ref={ref}
        className="relative z-10 w-[500px] flex rounded-lg border-2 border-gray-600"
      >
        <div className="gritty absolute z-[-10] w-full h-full bg-zinc-700 rounded-lg" />
        <div className="flex flex-col w-full h-full justify-center gap-5 p-5">
          <h3 className="text-xl font-semibold text-center text-white dark:text-black">
            {title}
          </h3>

          <div className="leading-relaxed">{contents}</div>

          <div className="flex justify-center items-center gap-2">{buttons}</div>
        </div>
      </div>
    </div>
  )
}
