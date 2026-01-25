import { AbilityIcon } from './AbilityIcon.tsx'
import type { MouseEventHandler } from 'react'

interface Props {
  icon: string
  size: number
  selected?: boolean
  onClick?: MouseEventHandler
  disabled?: boolean
  tooltipId?: string
}

export function SelectableAbilityIcon({
  selected,
  icon,
  size,
  onClick,
  disabled,
  tooltipId,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={disabled ? '' : 'cursor-pointer select-none'}
      data-tooltip-id={tooltipId}
    >
      {selected && (
        <div
          className="absolute rounded icon-highlight"
          style={{ height: size, width: size }}
        />
      )}
      <AbilityIcon size={size} icon={icon} />
    </div>
  )
}
