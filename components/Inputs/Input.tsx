import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'
import { TooltipStyled } from '../Common/TooltipStyled'

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange' | 'value'
  > {
  label: string
  onChange: (newValue: string) => void
  value: string | number | undefined
  labelTooltip?: ReactNode
  inputTooltip?: ReactNode
  fullWidth?: boolean
}

export function Input({
  label,
  onChange,
  value,
  labelTooltip,
  inputTooltip,
  fullWidth,
  ...props
}: InputProps) {
  const widthClass = fullWidth ? 'w-full' : 'w-32'

  return (
    <div className={`flex flex-col ${widthClass}`}>
      <label data-tooltip-id={`${label}-label-tooltip`} className="block font-bold mb-1">
        {label}
      </label>
      <TooltipStyled id={`${label}-label-tooltip`}>{labelTooltip}</TooltipStyled>
      <input
        data-tooltip-id={`${label}-input-tooltip`}
        className={`bg-zinc-700 border-2 border-zinc-600 text-sm text-white rounded py-1.5 px-4 focus:outline-none focus:bg-zinc-800 focus:border-teal-500`}
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
