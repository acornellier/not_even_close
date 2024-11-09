import type { CharacterStatsInput } from '../../backend/characters'
import { NumericInput } from '../Inputs/NumericInput'
import {
  armorToPhysicalDr,
  avoidanceRawToPercent,
  staminaToHp,
  versRawToPercent,
} from '../../backend/stats'
import type { Ability } from '../../backend/ability'
import { formatNumber, roundTo } from '../../util/utils.ts'
import { shieldOfTheRighteous } from '../../backend/classAbilities/paladin.ts'
import type { ClassSpec } from '../../backend/classes.ts'
import { classSpecs } from '../../backend/classes.ts'

interface Props {
  classSpec: ClassSpec
  characterStats: CharacterStatsInput
  onChange: (characterStats: CharacterStatsInput) => void
  specAbilities: Ability[]
  idx?: number
}

export function CharacterStatsForm({
  classSpec,
  characterStats,
  onChange,
  specAbilities,
  idx,
}: Props) {
  const onChangeStat =
    (field: keyof CharacterStatsInput) => (value: number | undefined) =>
      onChange({
        ...characterStats,
        [field]: value,
      })

  const showMainStat = specAbilities.some(
    (ability) =>
      ability.id === shieldOfTheRighteous.id ||
      ability.absorb?.apMultipler ||
      ability.absorb?.spMultipler ||
      ability.abilityAugmentations?.some(
        (augmentation) =>
          augmentation.absorbField === 'apMultipler' ||
          augmentation.absorbField === 'spMultipler',
      ),
  )

  const mainStat = classSpecs[classSpec.class][classSpec.spec]!.mainStat

  const showMastery = specAbilities.some(({ notes }) =>
    notes?.toLowerCase().includes('mastery'),
  )

  const versPercent = versRawToPercent(characterStats.versatilityRaw ?? 0)
  const avoidancePercent = avoidanceRawToPercent(characterStats.avoidanceRaw ?? 0)
  const physicalDr = armorToPhysicalDr(characterStats.armor ?? 0)

  return (
    <div className="flex gap-3 flex-wrap -mt-1">
      <NumericInput
        label="Stamina"
        value={characterStats.stamina}
        onChange={onChangeStat('stamina')}
        tooltipSuffix={idx}
        inputTooltip={`${formatNumber(staminaToHp(characterStats.stamina ?? 0))} HP`}
        hideArrows
      />
      <NumericInput
        label="Versatility"
        value={characterStats.versatilityRaw}
        onChange={onChangeStat('versatilityRaw')}
        tooltipSuffix={idx}
        labelTooltip="Raw vers, NOT %"
        inputTooltip={`${versPercent}% vers, ${roundTo(versPercent / 2, 2)}% DR`}
        hideArrows
      />
      <NumericInput
        label="Avoidance"
        value={characterStats.avoidanceRaw}
        onChange={onChangeStat('avoidanceRaw')}
        tooltipSuffix={idx}
        labelTooltip="Raw avoidance, NOT %"
        inputTooltip={`${avoidancePercent}% AoE DR`}
        hideArrows
      />
      <NumericInput
        label="Armor"
        value={characterStats.armor}
        onChange={onChangeStat('armor')}
        tooltipSuffix={idx}
        inputTooltip={`${roundTo(physicalDr * 100, 2)}% physical DR`}
        hideArrows
      />
      {showMainStat && (
        <NumericInput
          label={mainStat === 'strength' ? 'Strength' : 'Intellect'}
          value={characterStats.mainStat}
          onChange={onChangeStat('mainStat')}
          hideArrows
        />
      )}
      {showMastery && (
        <NumericInput
          label="Mastery %"
          value={characterStats.masteryPercent}
          onChange={onChangeStat('masteryPercent')}
          hideArrows
        />
      )}
    </div>
  )
}
