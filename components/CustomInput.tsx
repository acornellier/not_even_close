import { Tooltip } from 'react-tooltip'
import { ReactNode } from 'react'

interface Props {
  label: string
  placeholder: string
  tooltip: ReactNode
  setValue: (value: ((prevState: string) => string) | string) => void
  value: string
}

export function CustomInput({ label, placeholder, tooltip, value, setValue }: Props) {
  return (
    <div className="flex gap-4 items-start flex-col md:flex-row md:items-center">
      <div
        data-tooltip-id={`${label}-tooltip`}
        className="text-white bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 select-none"
      >
        {label}
      </div>
      <Tooltip
        id={`${label}-tooltip`}
        className="z-10 max-w-sm"
        opacity={1}
        place="right"
      >
        {tooltip}
      </Tooltip>
      <input
        className="bg-gray-200 dark:bg-zinc-700 border-2 border-gray-200 dark:border-zinc-600 text-black dark:text-white rounded w-40 py-1.5 px-4 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 min-w-[300px]"
        placeholder={placeholder}
        onChange={({ target: { value } }) => setValue(value)}
        value={value}
      />
    </div>
  )
}
