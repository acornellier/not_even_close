import { useState } from 'react'
import { classColors, classSpecs, WowClass, ClassSpec } from '../../backend/classes'
import Image from 'next/image'
import { SpecIcon } from '../Common/SpecIcon'

export interface DropdownProps {
  selectedClassSpec: ClassSpec
  onChange: (value: ClassSpec) => void
}

export function ClassDropdown({ selectedClassSpec, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)

  const handleChange = (option: ClassSpec) => {
    onChange(option)
    setOpen(false)
  }

  return (
    <div>
      <button
        className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 select-none"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <SpecIcon
          className="mr-1 -ml-1"
          wowClass={selectedClassSpec.class}
          spec={selectedClassSpec.spec}
          size={20}
        />
        {selectedClassSpec.spec} {selectedClassSpec.class}
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
        <div className="absolute z-10  divide-y divide-gray-100 rounded-lg shadow bg-gray-700">
          <div className="grid grid-cols-4 gap-2 px-4 py-2 text-sm text-gray-200">
            {(Object.keys(classSpecs) as WowClass[]).map((wowClass) => (
              <div className="p-1" key={wowClass}>
                <div
                  className="font-bold pl-1 mb-1"
                  style={{ color: classColors[wowClass] }}
                >
                  {wowClass}
                </div>
                {Object.keys(classSpecs[wowClass]).map((spec) => (
                  <div
                    key={spec}
                    className="cursor-pointer "
                    onClick={() => handleChange({ class: wowClass, spec: spec })}
                  >
                    <a className="flex gap-0.5 items-center pl-1 rounded hover:bg-gray-600 dark:hover:text-white select-none">
                      <SpecIcon wowClass={wowClass} spec={spec} size={20} />
                      <div className="p-1">{spec}</div>
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
