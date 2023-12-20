import {defaultApls, APL} from '../../simulator/apl'
import {Toggle} from '../Toggle'
import {useState} from 'react'
import {AplEditor} from './AplEditor'

interface Props {
  selectedApl: APL
  onChange: (apl: APL) => void
}

export function AplSelect({selectedApl, onChange}: Props) {
  const [customApl, setCustomApl] = useState<APL>({
    name: 'Custom APL',
    logic: [],
  })

  const options = [...defaultApls]

  const [showDetails, setShowDetails] = useState(false)

  const handleChange = (value: string) => {
    onChange(options.find(({name}) => name === value)!)
  }

  return (
    <div>
      <div className="flex flex-col mb-4">
        <label className="block font-bold mb-1 pr-4">APL</label>
        <select
          className="w-96 bg-gray-200 border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-teal-500"
          onChange={(e) => handleChange(e.target.value)}
          value={selectedApl?.name}
        >
          {options.map((apl) => (
            <option
              key={apl.name}
              value={apl.name}
              className="w-96 bg-gray-200 border-2 border-gray-200 rounded py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-teal-500"
            >
              {apl.name}
            </option>
          ))}
        </select>
      </div>
      <Toggle
        label="APL details"
        checked={showDetails}
        onChange={setShowDetails}
      />
      {showDetails && (
        <AplEditor
          editable={selectedApl.name === 'Custom APL'}
          apl={selectedApl}
          onChange={setCustomApl}
        />
      )}
    </div>
  )
}
