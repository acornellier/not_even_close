interface Props {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export function Toggle({ label, checked, onChange }: Props) {
  return (
    <label className="inline-flex relative items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-14 h-7 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] peer-checked:after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all border-gray-600 peer-checked:bg-teal-600"></div>
      <span className="ml-3 text-base font-medium">{label}</span>
    </label>
  )
}
