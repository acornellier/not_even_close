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
  tooltip?: ReactNode
  fullWidth?: boolean
}

export function Input({
  label,
  onChange,
  value,
  tooltip,
  fullWidth,
  ...props
}: InputProps) {
  const widthClass = fullWidth ? 'w-full' : 'w-32'

  return (
    <div className={`flex flex-col ${widthClass}`}>
      <label data-tooltip-id={`${label}-tooltip`} className="block font-bold mb-1">
        {label}
      </label>
      <TooltipStyled id={`${label}-tooltip`}>{tooltip}</TooltipStyled>
      <input
        className={`bg-gray-200 dark:bg-zinc-700 border-2 border-gray-200 dark:border-zinc-600 text-black text-sm dark:text-white rounded py-1.5 px-4 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-teal-500 dark:focus:border-teal-500`}
        onChange={({ target: { value } }) => onChange(value)}
        value={value ?? ''}
        {...props}
      />
    </div>
  )
}
