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
  design?: 'minimal' | 'full'
}

export function Input({
  label,
  onChange,
  value,
  labelTooltip,
  inputTooltip,
  design,
  ...props
}: InputProps) {
  const flexDirectionClass = design === 'minimal' ? 'flex-row items-center' : 'flex-col'
  const heightClass = !label ? 'h-full' : ''
  const widthClass = design === 'full' ? 'w-full' : ''
  const inputWidthClass = design === 'minimal' ? 'w-12' : ''
  const marginClass = design === 'minimal' ? 'mr-2' : 'mb-1'
  const paddingClass = design === 'minimal' ? 'p-1' : 'py-1.5 px-4'
  const borderClass = design === 'minimal' ? '' : 'border-2'

  return (
    <div className={`flex ${flexDirectionClass} ${widthClass}`}>
      {label && (
        <label
          data-tooltip-id={`${label}-label-tooltip`}
          className={`block font-bold whitespace-nowrap ${marginClass}`}
        >
          {label}
        </label>
      )}
      <TooltipStyled id={`${label}-label-tooltip`}>{labelTooltip}</TooltipStyled>
      <input
        data-tooltip-id={`${label}-input-tooltip`}
        className={`${heightClass} ${inputWidthClass} bg-zinc-700 ${borderClass} border-zinc-600 text-sm text-white rounded ${paddingClass} focus:outline-none focus:bg-zinc-800 focus:border-teal-500`}
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
