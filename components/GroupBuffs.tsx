import { AbilitySelect } from './AbilitySelect'
import { Ability } from '../backend/ability'

interface Props {
  label: string
  allAbilities: Ability[]
  selectedGroupAbilities: Ability[]
  setSelectedGroupAbilities: (abilities: Ability[]) => void
}

export function GroupBuffs({
  label,
  allAbilities,
  selectedGroupAbilities,
  setSelectedGroupAbilities,
}: Props) {
  return (
    <div className="flex gap-4 items-start flex-col md:flex-row md:items-center">
      <label className="text-white bg-teal-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-teal-600 whitespace-nowrap">
        {label}
      </label>
      <AbilitySelect
        allAbilities={allAbilities}
        selectedAbilities={selectedGroupAbilities}
        setSelectedAbilities={setSelectedGroupAbilities}
      />
    </div>
  )
}
