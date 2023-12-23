interface Props {
  label: string
  max?: number
  min?: number
  step?: number
  onChange: (newValue: number) => void
  value: number
}

export function NumericInput({
  label,
  max,
  min,
  step = 1,
  onChange,
  value,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="block font-bold mb-1 pr-4">{label}</label>
      <div>
        <input
          className="bg-gray-200 border-2 border-gray-200 rounded w-40 py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-teal-500"
          type="number"
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          value={value}
        />
      </div>
    </div>
  )
}
