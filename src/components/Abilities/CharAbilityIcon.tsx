import type {
  Ability,
  AbilityAugmentation,
  AbilityField,
  AbsorbOptions,
  SelectedAbility,
  StackOptions,
} from '../../backend/ability'
import { abilityEffectFields } from '../../backend/ability'
import { defaultStacks, roundHundred } from '../../backend/utils'
import { Fragment } from 'react'
import { useSimContext } from '../../util/useSimContext.ts'
import { TooltipStyled } from '../Common/TooltipStyled'
import { getMultiplierAbsorb } from '../../backend/sim/absorbs'
import { barkskin } from '../../backend/classAbilities/druid'
import { ZamIcon } from '../Common/ZamIcon.tsx'
import { NumericInput } from '../Inputs/NumericInput.tsx'

const iconSize = 40

interface AbilityIconProps {
  ability: Ability
  selectedAbility: SelectedAbility | undefined
  toggleAbility: (spellId: number) => void
  setAbilityStacks: (spellId: number, stacks: number) => void
  allAbilities: Ability[]
  characterIdx?: number
}

function getStackArray(stacks: StackOptions | undefined) {
  return !stacks || stacks.type === 'stacks'
    ? [1]
    : Array.from({ length: stacks.max }, (_, index) => index + 1)
}

function mapStacks(
  value: number,
  stackArray: number[],
  formatter: (v: number) => number | string,
) {
  return stackArray
    .map((stack) => value * stack)
    .map(formatter)
    .join('/')
}

function getAbsorbText(absorb: AbsorbOptions, { stacks }: Ability) {
  const stackArray = getStackArray(stacks)

  const absorbs = []
  if (absorb.raw) {
    const values = mapStacks(absorb.raw, stackArray, (v) => v.toLocaleString('en-US'))
    absorbs.push(`${values} HP`)
  } else if (absorb.healthMultiplier) {
    const values = mapStacks(absorb.healthMultiplier, stackArray, roundHundred)
    absorbs.push(`${values}% HP`)
  }

  if (absorb.spMultipler) {
    absorbs.push(`${roundHundred(absorb.spMultipler)}% SP`)
  } else if (absorb.apMultipler) {
    absorbs.push(`${roundHundred(absorb.apMultipler)}% AP`)
  }

  if (!absorbs.length) return ''

  let str = absorbs.join(' + ')

  str += ` ${absorb.absorbType ? absorb.absorbType + ' ' : ''}absorb`

  if (absorb.versAffected) str += ' (+vers)'

  return str
}

function getExtraAbsorbText(calculatedAbsorb: number) {
  if (!calculatedAbsorb) return ''

  return ` - ${calculatedAbsorb.toLocaleString('en-US')} absorb`
}

function getNumberText(field: AbilityField, value: number, { drType, stacks }: Ability) {
  const stackArray = getStackArray(stacks)

  const values = mapStacks(value, stackArray, (calculatedValue) =>
    field === 'versRawIncrease' ? calculatedValue : roundHundred(calculatedValue),
  )

  switch (field) {
    case 'dr':
      return `${values}% ${drType ? drType + ' ' : ''}DR`
    case 'aoeDr':
      return `${values}% AoE DR`
    case 'damageDealtReduction':
      return `${values}% less enemy damage`
    case 'healthIncrease':
      return `${values}% HP`
    case 'staminaIncrease':
      return `${values}% stamina`
    case 'versIncrease':
      return `${values}% versatility`
    case 'versRawIncrease':
      return `${values} versatility`
    default:
      console.error(`Unknown ability field: ${field}`)
      return 'Error'
  }
}

function getEffectText<T extends AbilityField>(
  field: T,
  value: Ability[T],
  ability: Ability,
) {
  let text = ''
  if (field === 'absorb') {
    text += getAbsorbText(value as AbsorbOptions, ability)
  } else {
    text += getNumberText(field, value as number, ability)
  }

  if (ability?.stacks?.type === 'stacks') text += ` per stack`

  return text
}

function getAugmentationText(augmentation: AbilityAugmentation, ability: Ability) {
  if (augmentation.field === 'absorb' && augmentation.absorbField === 'healthMultiplier')
    return `${augmentation.value * 100}% more absorb`

  if (augmentation.otherSpellId === barkskin.spellId)
    return `+${augmentation.value * 100}% AP absorb`

  return `+${getEffectText(augmentation.field, augmentation.value, ability)}`
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
        <ZamIcon
          className={`rounded border-2 border-gray-600`}
          size={iconSize}
          src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
          alt={ability.name}
        />
      </div>
      <TooltipStyled id={tooltipId} clickable={!!ability.stacks}>
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
