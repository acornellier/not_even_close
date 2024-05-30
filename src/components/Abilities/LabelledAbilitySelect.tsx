import { AbilitySelect } from './AbilitySelect'
import type { Ability, SelectedAbility } from '../../backend/ability'
import { Label } from '../Common/Label'

interface Props {
  label: string
  availableAbilities: Ability[]
  selectedAbilities: SelectedAbility[]
  setSelectedAbilities: (abilities: SelectedAbility[]) => void
  characterIdx?: number
}

export function LabelledAbilitySelect({
  label,
  characterIdx,
  availableAbilities,
  selectedAbilities,
  setSelectedAbilities,
}: Props) {
  return (
    <div className="flex gap-3 items-start flex-col md:flex-row md:items-center">
      <Label>{label}</Label>
      <AbilitySelect
        characterIdx={characterIdx}
        availableAbilities={availableAbilities}
        selectedAbilities={selectedAbilities}
        setSelectedAbilities={setSelectedAbilities}
      />
    </div>
  )
}
