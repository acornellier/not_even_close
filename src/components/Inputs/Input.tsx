import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'
import { TooltipStyled } from '../Common/TooltipStyled'

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange' | 'value'
  > {
  label?: string
  onChange: (newValue: string) => void
  value: string | number | undefined
  labelTooltip?: ReactNode
  inputTooltip?: ReactNode
  width?: 'normal' | 'icon' | 'full'
}

export function Input({
  label,
  onChange,
  value,
  labelTooltip,
  inputTooltip,
  width,
  ...props
}: InputProps) {
  const heightClass = !label ? 'h-full' : ''
  const widthClass = width === 'full' ? 'w-full' : width === 'icon' ? 'w-12' : 'w-28'
  const paddingClass = width === 'icon' ? 'px-1' : 'px-4'

  return (
    <div className={`flex flex-col ${widthClass}`}>
      {label && (
        <label
          data-tooltip-id={`${label}-label-tooltip`}
          className="block font-bold mb-1"
        >
          {label}
        </label>
      )}
      <TooltipStyled id={`${label}-label-tooltip`}>{labelTooltip}</TooltipStyled>
      <input
        data-tooltip-id={`${label}-input-tooltip`}
        className={`${heightClass} bg-zinc-700 border-2 border-zinc-600 text-sm text-white rounded py-1.5 ${paddingClass} focus:outline-none focus:bg-zinc-800 focus:border-teal-500`}
        onChange={({ target: { value } }) => onChange(value)}
        value={value ?? ''}
        {...props}
      />
      <TooltipStyled id={`${label}-input-tooltip`} place="bottom">
        {inputTooltip}
      </TooltipStyled>
    </div>
  )
}
