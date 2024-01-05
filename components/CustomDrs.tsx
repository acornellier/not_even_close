import { Tooltip } from 'react-tooltip'

interface Props {
  setCustomDrs: (value: ((prevState: string) => string) | string) => void
  customDrs: string
}

export function CustomDrs({ customDrs, setCustomDrs }: Props) {
  return (
    <div className="flex gap-4 items-start flex-col md:flex-row md:items-center">
      <div
        data-tooltip-id="custom-drs-help"
        className="text-white bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 select-none"
      >
        Custom DRs
      </div>
      <Tooltip id="custom-drs-help" className="z-10 max-w-sm" opacity={1} place="right">
        <p>
          Any missing DRs can be added here, such as racials. If you have 1% DR from
          racial, and 20% DR from the dark zone in Manifested Timeways, write &quot;1,
          20&quot;.
        </p>
        <p>Do NOT add vers DR, it is already accounted for.</p>
      </Tooltip>
      <input
        className="bg-gray-200 dark:bg-zinc-700 border-2 border-gray-200 dark:border-zinc-600 text-black dark:text-white rounded w-40 py-1.5 px-4 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 focus:border-teal-500 dark:focus:border-teal-500 min-w-[300px]"
        placeholder="Comma separated DRs (%)"
        onChange={({ target: { value } }) => setCustomDrs(value)}
        value={customDrs}
      />
    </div>
  )
}
