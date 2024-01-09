import { Tooltip } from 'react-tooltip'
import { ReactNode } from 'react'

interface Props {
  label: string
  max?: number
  min?: number
  step?: number
  onChange: (newValue: number | undefined) => void
  value: number | undefined
  tooltip?: ReactNode
}

export function NumericInput({
  label,
  max,
  min,
  step = 1,
  onChange,
  value,
  tooltip,
}: Props) {
  return (
    <div className="flex flex-col">
      <label data-tooltip-id={`${label}-tooltip`} className="block font-bold mb-1">
        {label}
      </label>
      <Tooltip
        id={`${label}-tooltip`}
        className="z-10 max-w-sm"
        opacity={1}
        place="right"
      >
        {tooltip}
      </Tooltip>
      <div>
        <input
          className="bg-gray-200 dark:bg-zinc-700 border-2 border-gray-200 dark:border-zinc-600 text-black text-sm dark:text-white rounded w-40 py-1.5 px-4 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-teal-500 dark:focus:border-teal-500"
          type="number"
          min={min}
          max={max}
          step={step}
          onChange={({ target: { value } }) => {
            onChange(value === '' ? undefined : Number(value))
          }}
          value={value ?? ''}
        />
      </div>
    </div>
  )
}
