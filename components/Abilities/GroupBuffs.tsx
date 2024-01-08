import { AbilitySelect } from './AbilitySelect'
import { Ability } from '../../backend/ability'
import { Label } from '../Inputs/Label'

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
      <Label>{label}</Label>
      <AbilitySelect
        allAbilities={allAbilities}
        selectedAbilities={selectedGroupAbilities}
        setSelectedAbilities={setSelectedGroupAbilities}
      />
    </div>
  )
}
