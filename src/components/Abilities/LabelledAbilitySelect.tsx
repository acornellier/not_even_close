import { AbilitySelect } from './AbilitySelect'
import type { Ability, SelectedAbility } from '../../backend/ability'
import { Label } from '../Common/Label'

interface Props {
  label: string
  availableAbilities: Ability[]
  selectedAbilities: SelectedAbility[]
  setSelectedAbilities: (abilities: SelectedAbility[]) => void
}

export function LabelledAbilitySelect({
  label,
  availableAbilities,
  selectedAbilities,
  setSelectedAbilities,
}: Props) {
  return (
    <div className="flex gap-3 items-start flex-col md:flex-row md:items-center">
      <Label>{label}</Label>
      <AbilitySelect
        availableAbilities={availableAbilities}
        selectedAbilities={selectedAbilities}
        setSelectedAbilities={setSelectedAbilities}
      />
    </div>
  )
}
