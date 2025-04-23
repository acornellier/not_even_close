import type {
  Ability,
  AbilityReplacement,
  SelectedAbilityId,
} from '../../backend/ability'
import { abilityEffectFields } from '../../backend/ability'
import { defaultStacks, formatNumber } from '../../util/utils.ts'
import { Fragment } from 'react'
import { useSimContext } from '../../util/useSimContext.ts'
import { TooltipStyled } from '../Common/TooltipStyled'
import { getAbsorb } from '../../backend/sim/absorbs'
import { NumericInput } from '../Inputs/NumericInput.tsx'
import {
  getAugmentationText,
  getEffectText,
  getExtraAbsorbText,
} from './abilityTooltipFormat.ts'
import { Button } from '../Common/Button.tsx'
import { SelectableAbilityIcon } from '../Common/SelectableAbilityIcon.tsx'
import { baseHp } from '../../backend/stats.ts'

const iconSize = 40

interface AbilityIconProps {
  ability: Ability
  selectedAbility: SelectedAbilityId | undefined
  toggleAbility: (spellId: number) => void
  setAbilityStacks: (spellId: number, stacks: number) => void
  replaceAbility?: (replacement: AbilityReplacement) => void
  allAbilities: Ability[]
  characterIdx?: number
}

interface UrsineVigorSwapperProps {
  ability: Ability
  replaceAbility?: (replacement: AbilityReplacement) => void
}

function UrsineVigorSwapper({ ability, replaceAbility }: UrsineVigorSwapperProps) {
  if (!ability.replacedBy || !replaceAbility) return

  return (
    <Button
      short
      className="mt-1"
      onClick={() =>
        replaceAbility({ sourceId: ability.id, targetId: ability.replacedBy! })
      }
    >
      Swap to {ability.abilityAugmentations ? 'active' : 'passive'} version
    </Button>
  )
}

export function CharAbilityIcon({
  ability,
  selectedAbility,
  toggleAbility,
  setAbilityStacks,
  replaceAbility,
  allAbilities,
  characterIdx,
}: AbilityIconProps) {
  const augmentedAbilities = ability.abilityAugmentations
    ? allAbilities.filter(({ id }) =>
        ability.abilityAugmentations?.some(
          (augmentation) => id === augmentation.otherAbilityId,
        ),
      )
    : null

  const isSelected = !!selectedAbility

  const { result } = useSimContext()
  let calculatedAbsorb = 0
  if (result && ability.absorb) {
    const resultChar =
      characterIdx !== undefined ? result.main.characters[characterIdx] : undefined

    calculatedAbsorb = getAbsorb(
      ability.absorb,
      ability,
      ability.stacks ? selectedAbility?.stacks ?? defaultStacks(ability.stacks) : 1,
      resultChar ?? null,
      result.main.characters,
    )
  }

  const tooltipId = `ability-tooltip-${ability.id}${characterIdx ? `-${characterIdx}` : ''}`

  return (
    <>
      <div key={ability.id} data-tooltip-id={tooltipId} className="relative">
        {ability.stacks && selectedAbility?.stacks ? (
          <div className="absolute rounded bottom-0 right-1 text-sm text-white text-outline">
            {selectedAbility.stacks}/{ability.stacks.max}
          </div>
        ) : null}
        <SelectableAbilityIcon
          icon={ability.icon}
          size={iconSize}
          selected={isSelected}
          onClick={(e) => {
            e.preventDefault()
            toggleAbility(ability.id)
          }}
        />
      </div>
      <TooltipStyled
        id={tooltipId}
        clickable={
          (!!ability.stacks && !!selectedAbility) ||
          (!!ability.replacedBy && !!replaceAbility)
        }
      >
        <div className="flex flex-col">
          <span className="text-xl">{ability.name}</span>
          {abilityEffectFields.map((field) => {
            const value = ability[field]
            return (
              value && (
                <span key={field}>
                  {getEffectText(field, value, ability, selectedAbility)}
                  {field === 'absorb' && getExtraAbsorbText(calculatedAbsorb)}
                </span>
              )
            )
          })}
          {augmentedAbilities?.map((augmentedAbility) => {
            const augmentations = ability.abilityAugmentations?.filter(
              (augmentation) => augmentation.otherAbilityId === augmentedAbility.id,
            )
            if (!augmentations || augmentations.length === 0) return null

            return augmentations.map((augmentation, idx) => (
              <Fragment key={`${augmentedAbility.id}-${idx}`}>
                <span>
                  Improves {augmentedAbility.name}:{' '}
                  {getAugmentationText(augmentation, ability, selectedAbility)}
                </span>
              </Fragment>
            ))
          })}
          {ability.notes && (
            <span>
              {ability.notes.replace(
                '{{backup}}',
                `${formatNumber((ability.absorb?.healthMultiplier ?? 0) * baseHp)}`,
              )}
            </span>
          )}
          {ability.stacks && selectedAbility && (
            <div className="mt-1">
              <NumericInput
                label={ability.stacks.type === 'stacks' ? 'Stacks' : 'Talent points'}
                design="minimal"
                onChange={(newValue) => setAbilityStacks(ability.id, newValue ?? 0)}
                value={selectedAbility.stacks}
                min={1}
                max={ability.stacks.max}
              />
            </div>
          )}
          <UrsineVigorSwapper ability={ability} replaceAbility={replaceAbility} />
        </div>
      </TooltipStyled>
    </>
  )
}
