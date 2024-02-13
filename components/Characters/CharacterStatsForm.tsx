import { CharacterStatsInput } from '../../backend/characters'
import { NumericInput } from '../Inputs/NumericInput'
import { avoidanceRawToPercent, staminaToHp, versRawToPercent } from '../../backend/stats'

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
        inputTooltip={`${staminaToHp(characterStats.stamina ?? 0)} HP`}
      />
      <NumericInput
        label="Versatility (raw)"
        value={characterStats.versatilityRaw}
        onChange={onChangeStat('versatilityRaw')}
        step={100}
        inputTooltip={`${versRawToPercent(characterStats.versatilityRaw ?? 0)}%`}
      />
      <NumericInput
        label="Avoidance (raw)"
        value={characterStats.avoidanceRaw}
        onChange={onChangeStat('avoidanceRaw')}
        inputTooltip={`${avoidanceRawToPercent(characterStats.avoidanceRaw ?? 0)}%`}
      />
    </div>
  )
}
