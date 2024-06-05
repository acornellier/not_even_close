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
  tooltipSuffix?: string | number
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
  tooltipSuffix,
  design,
  ...props
}: InputProps) {
  const flexDirectionClass = design === 'minimal' ? 'flex-row items-center' : 'flex-col'
  const heightClass = !label ? 'h-full' : ''
  const widthClass = design === 'full' ? 'w-full' : design === 'minimal' ? '' : 'w-28'
  const inputWidthClass = design === 'minimal' ? 'w-12' : ''
  const marginClass = design === 'minimal' ? 'mr-2' : 'mb-1'
  const paddingClass = design === 'minimal' ? 'p-1' : 'py-1.5 px-4'
  const borderClass = design === 'minimal' ? '' : 'border-2'

  const labelTooltipId = `${label}-label-tooltip-${tooltipSuffix}`
  const inputTooltipId = `${label}-input-tooltip-${tooltipSuffix}`

  return (
    <div className={`flex ${flexDirectionClass} ${widthClass}`}>
      {label && (
        <label
          data-tooltip-id={labelTooltipId}
          className={`block font-bold whitespace-nowrap ${marginClass}`}
        >
          {label}
        </label>
      )}
      <TooltipStyled id={labelTooltipId}>{labelTooltip}</TooltipStyled>
      <input
        data-tooltip-id={inputTooltipId}
        className={`${heightClass} ${inputWidthClass} bg-zinc-700 ${borderClass} border-zinc-600 text-sm text-white rounded ${paddingClass} focus:outline-none focus:bg-zinc-800 focus:border-teal-500`}
        onChange={({ target: { value } }) => onChange(value)}
        value={value ?? ''}
        {...props}
      />
      <TooltipStyled id={inputTooltipId} place="bottom">
        {inputTooltip}
      </TooltipStyled>
    </div>
  )
}
