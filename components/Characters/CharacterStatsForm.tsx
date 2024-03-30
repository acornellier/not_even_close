import { CharacterStatsInput } from '../../backend/characters'
import { NumericInput } from '../Inputs/NumericInput'
import { avoidanceRawToPercent, staminaToHp, versRawToPercent } from '../../backend/stats'
import { Ability } from '../../backend/ability'

interface Props {
  characterStats: CharacterStatsInput
  onChange: (characterStats: CharacterStatsInput) => void
  specAbilities: Ability[]
}

export function CharacterStatsForm({ characterStats, onChange, specAbilities }: Props) {
  const onChangeStat =
    (field: keyof CharacterStatsInput) => (value: number | undefined) =>
      onChange({
        ...characterStats,
        [field]: value,
      })

  const showMainStat = specAbilities.some(
    (ability) =>
      ability.absorb?.apMultipler ||
      ability.absorb?.spMultipler ||
      ability.abilityAugmentations?.some(
        (augmentation) =>
          augmentation.absorbField === 'apMultipler' ||
          augmentation.absorbField === 'spMultipler'
      )
  )

  return (
    <div className="flex gap-3 flex-wrap">
      <NumericInput
        label="Stamina"
        value={characterStats.stamina}
        onChange={onChangeStat('stamina')}
        step={500}
        inputTooltip={`${staminaToHp(characterStats.stamina ?? 0).toLocaleString(
          'en-US'
        )} HP`}
      />
      <NumericInput
        label="Versatility"
        value={characterStats.versatilityRaw}
        onChange={onChangeStat('versatilityRaw')}
        step={100}
        labelTooltip="Raw vers, NOT %"
        inputTooltip={`${versRawToPercent(characterStats.versatilityRaw ?? 0)}%`}
      />
      <NumericInput
        label="Avoidance"
        value={characterStats.avoidanceRaw}
        onChange={onChangeStat('avoidanceRaw')}
        labelTooltip="Raw avoidance, NOT %"
        inputTooltip={`${avoidanceRawToPercent(characterStats.avoidanceRaw ?? 0)}%`}
      />
      <NumericInput
        label="Armor"
        value={characterStats.armor}
        onChange={onChangeStat('armor')}
      />
      {showMainStat && (
        <NumericInput
          label="Main stat"
          value={characterStats.mainStat}
          onChange={onChangeStat('mainStat')}
        />
      )}
    </div>
  )
}
