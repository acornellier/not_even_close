import type { Ability, SelectedAbility } from '../../backend/ability'
import { abilityEffectFields } from '../../backend/ability'
import { defaultStacks } from '../../backend/utils'
import { Fragment } from 'react'
import { useSimContext } from '../../util/useSimContext.ts'
import { TooltipStyled } from '../Common/TooltipStyled'
import { getMultiplierAbsorb } from '../../backend/sim/absorbs'
import { NumericInput } from '../Inputs/NumericInput.tsx'
import {
  getAugmentationText,
  getEffectText,
  getExtraAbsorbText,
} from './abilityTooltipFormat.ts'
import { AbilityIcon } from '../Common/AbilityIcon.tsx'

const iconSize = 40

interface AbilityIconProps {
  ability: Ability
  selectedAbility: SelectedAbility | undefined
  toggleAbility: (spellId: number) => void
  setAbilityStacks: (spellId: number, stacks: number) => void
  allAbilities: Ability[]
  characterIdx?: number
}

export function CharAbilityIcon({
  ability,
  selectedAbility,
  toggleAbility,
  setAbilityStacks,
  allAbilities,
  characterIdx,
}: AbilityIconProps) {
  const augmentedAbilities = ability.abilityAugmentations
    ? allAbilities.filter(({ spellId }) =>
        ability.abilityAugmentations?.some(
          (augmentation) => spellId === augmentation.otherSpellId,
        ),
      )
    : null

  const isSelected = !!selectedAbility

  const { result } = useSimContext()
  let calculatedAbsorb = 0
  if (result && ability.absorb) {
    const resultChar =
      characterIdx !== undefined ? result.main.characters[characterIdx] : undefined

    calculatedAbsorb = getMultiplierAbsorb(
      ability.absorb,
      ability,
      ability.stacks ? selectedAbility?.stacks ?? defaultStacks(ability.stacks) : 1,
      resultChar ?? null,
      result.main.characters,
    )
  }

  const tooltipId = `ability-tooltip-${ability.spellId}${characterIdx ? `-${characterIdx}` : ''}`

  return (
    <>
      <div
        key={ability.spellId}
        data-tooltip-id={tooltipId}
        className="cursor-pointer select-none relative"
        onClick={(e) => {
          e.preventDefault()
          toggleAbility(ability.spellId)
        }}
      >
        {ability.stacks && selectedAbility?.stacks ? (
          <div className="absolute rounded bottom-0 right-1 text-sm text-white text-outline">
            {selectedAbility.stacks}/{ability.stacks.max}
          </div>
        ) : null}
        {isSelected && (
          <div
            className="absolute rounded icon-highlight"
            style={{ height: iconSize, width: iconSize }}
          />
        )}
        <AbilityIcon size={iconSize} icon={ability.iconName} />
      </div>
      <TooltipStyled id={tooltipId} clickable={!!ability.stacks && !!selectedAbility}>
        <div className="flex flex-col">
          <span className="text-xl">{ability.name}</span>
          {abilityEffectFields.map((field) => {
            const value = ability[field]
            return (
              value && (
                <span key={field}>
                  {getEffectText(field, value, ability)}
                  {field === 'absorb' && getExtraAbsorbText(calculatedAbsorb)}
                </span>
              )
            )
          })}
          {augmentedAbilities?.map((augmentedAbility) => {
            const augmentation = ability.abilityAugmentations?.find(
              (augmentation) => augmentation.otherSpellId === augmentedAbility.spellId,
            )
            if (!augmentation) return null

            return (
              <Fragment key={augmentedAbility.spellId}>
                <span>
                  Improves {augmentedAbility.name}:{' '}
                  {getAugmentationText(augmentation, ability)}
                </span>
              </Fragment>
            )
          })}
          {ability.notes && <span>{ability.notes}</span>}
          {ability.stacks && selectedAbility && (
            <div className="mt-1">
              <NumericInput
                label={ability.stacks.type === 'stacks' ? 'Stacks' : 'Talent points'}
                design="minimal"
                onChange={(newValue) => setAbilityStacks(ability.spellId, newValue ?? 0)}
                value={selectedAbility.stacks}
                min={1}
                max={ability.stacks.max}
              />
            </div>
          )}
        </div>
      </TooltipStyled>
    </>
  )
}
