import { useState } from 'react'

export interface DropdownProps {
  options: readonly string[]
  label: string
  value: string | null
  onChange: (value: string) => void
}

export function Dropdown({ options, label, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)

  const handleChange = (option: string) => {
    onChange(option)
    setOpen(false)
  }

  return (
    <div>
      <button
        className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        type="button"
        onClick={() => setOpen(!open)}
      >
        {value ?? label}
        <svg
          className="w-2.5 h-2.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {options.map((option) => (
              <li
                key={option}
                className="cursor-pointer"
                onClick={() => handleChange(option)}
              >
                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
