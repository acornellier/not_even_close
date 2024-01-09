import { CharacterStats, CharacterStatsInput } from '../backend/characterStats'
import { NumericInput } from './Inputs/NumericInput'

interface Props {
  characterStats: CharacterStatsInput
  onChange: (characterStats: CharacterStatsInput) => void
}

export function CharacterStatsForm({ characterStats, onChange }: Props) {
  const onChangeStat =
    (field: keyof CharacterStatsInput) => (value: number | undefined) =>
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
        step={500}
      />
      <NumericInput
        label="Versatility (%)"
        value={characterStats.versatilityPercent}
        onChange={onChangeStat('versatilityPercent')}
        tooltip={
          <span>
            <p>Total vers, not just the DR portion.</p>
            <p>If below 30% vers, 205 points = 1% vers</p>
          </span>
        }
      />
      <NumericInput
        label="Avoidance (%)"
        value={characterStats.avoidancePercent}
        onChange={onChangeStat('avoidancePercent')}
        tooltip="70.26 points = 1% avoidance"
      />
    </div>
  )
}
