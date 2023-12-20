import { CharacterStats } from '../simulator/characterStats'
import { NumericInput } from './NumericInput'
import { roundTo } from '../simulator/utils'

interface Props {
  characterStats: CharacterStats
  onChange: (characterStats: CharacterStats) => void
}

export function CharacterStatsForm({ characterStats, onChange }: Props) {
  const onChangeStat = (field: keyof CharacterStats) => (value: number) =>
    onChange({
      ...characterStats,
      [field]: value,
    })

  return (
    <div className="flex gap-4 flex-wrap">
      <NumericInput
        label="Stamina"
        value={characterStats.stamina}
        onChange={onChangeStat('stamina')}
      />
      <NumericInput
        label="Versatility (dr %)"
        value={characterStats.versatilityDrPercent}
        onChange={onChangeStat('versatilityDrPercent')}
      />
    </div>
  )
}
