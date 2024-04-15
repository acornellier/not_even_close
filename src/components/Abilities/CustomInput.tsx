import type { ReactNode } from 'react'
import { Label } from '../Common/Label'
import { TooltipStyled } from '../Common/TooltipStyled'

interface Props {
  label: string
  placeholder: string
  tooltip: ReactNode
  setValue: (value: ((prevState: string) => string) | string) => void
  value: string
}

export function CustomInput({ label, placeholder, tooltip, value, setValue }: Props) {
  return (
    <div className="flex gap-3 items-start flex-col md:flex-row md:items-center">
      <Label data-tooltip-id={`${label}-tooltip`}>{label}</Label>
      <TooltipStyled id={`${label}-tooltip`}>{tooltip}</TooltipStyled>
      <input
        className="bg-zinc-700 border-2 border-zinc-600 text-white rounded w-40 py-1.5 px-4 focus:outline-none focus:bg-zinc-800 focus:border-teal-500 min-w-[300px]"
        placeholder={placeholder}
        onChange={({ target: { value } }) => setValue(value)}
        value={value}
      />
    </div>
  )
}
