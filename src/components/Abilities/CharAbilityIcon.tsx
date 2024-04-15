import {
  Ability,
  AbilityAugmentation,
  AbilityField,
  abilityFields,
  AbsorbOptions,
} from '../../backend/ability'
import { isAbilitySelected, roundTo } from '../../backend/utils'
import { Fragment } from 'react'
import { useSimContext } from '../../util/useSimContext.ts'
import { TooltipStyled } from '../Common/TooltipStyled'
import { getMultiplierAbsorb } from '../../backend/sim/absorbs'
import { barkskin } from '../../backend/classAbilities/druid'
import { Image } from '../Common/Image.tsx'

const iconSize = 40

interface AbilityIconProps {
  ability: Ability
  toggleAbility: (spellId: number) => void
  selectedAbilities: Ability[]
  allAbilities: Ability[]
  characterIdx?: number
}

function getAbsorbText(absorb: AbsorbOptions) {
  const absorbs = []
  if (absorb.raw) {
    absorbs.push(`${absorb.raw.toLocaleString('en-US')} HP`)
  } else if (absorb.healthMultiplier) {
    absorbs.push(`${roundTo(absorb.healthMultiplier * 100, 2)}% HP`)
  }

  if (absorb.spMultipler) {
    absorbs.push(`${roundTo(absorb.spMultipler * 100, 2)}% SP`)
  } else if (absorb.apMultipler) {
    absorbs.push(`${roundTo(absorb.apMultipler * 100, 2)}% AP`)
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

function getNumberText(field: AbilityField, value: number, ability?: Ability) {
  const damageType = ability?.drType
  switch (field) {
    case 'dr':
      return `${roundTo(value * 100, 2)}% ${damageType ? damageType + ' ' : ''}DR`
    case 'aoeDr':
      return `${roundTo(value * 100, 2)}% AoE DR`
    case 'healthIncrease':
      return `${roundTo(value * 100, 2)}% HP`
    case 'staminaIncrease':
      return `${roundTo(value * 100, 2)}% stamina`
    case 'versIncrease':
      return `${roundTo(value * 100, 2)}% versatility`
    case 'versRawIncrease':
      return `${value} versatility`
    default:
      console.error(`Unknown ability field: ${field}`)
      return 'Error'
  }
}

function getEffectText<T extends AbilityField>(
  field: T,
  value: Ability[T],
  ability?: Ability,
) {
  if (field === 'absorb') {
    return getAbsorbText(value as AbsorbOptions)
  } else {
    return getNumberText(field, value as number, ability)
  }
}

function getAugmentationText(augmentation: AbilityAugmentation) {
  if (augmentation.field === 'absorb' && augmentation.absorbField === 'healthMultiplier')
    return `${augmentation.value * 100}% more absorb`

  if (augmentation.otherSpellId === barkskin.spellId)
    return `+${augmentation.value * 100}% AP absorb`

  return `+${getEffectText(augmentation.field, augmentation.value)}`
}

export function CharAbilityIcon({
  ability,
  toggleAbility,
  selectedAbilities,
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

  const isSelected = isAbilitySelected(ability.spellId, selectedAbilities)

  const { result } = useSimContext()
  let calculatedAbsorb = 0
  if (result && ability.absorb) {
    const resultChar =
      characterIdx !== undefined ? result.main.characters[characterIdx] : undefined

    calculatedAbsorb = getMultiplierAbsorb(
      ability.absorb,
      ability,
      resultChar ?? null,
      result.main.characters,
    )
  }

  const tooltipId = `ability-tooltip-${ability.spellId}${
    characterIdx ? `-${characterIdx}` : ''
  }`

  return (
    <div
      key={ability.spellId}
      data-tooltip-id={tooltipId}
      className="cursor-pointer select-none relative"
      onClick={(e) => {
        e.preventDefault()
        toggleAbility(ability.spellId)
      }}
    >
      <TooltipStyled id={tooltipId}>
        <div className="flex flex-col">
          <span className="text-xl">{ability.name}</span>
          {abilityFields.map((field) => {
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
                  Improves {augmentedAbility.name}: {getAugmentationText(augmentation)}
                </span>
              </Fragment>
            )
          })}
          {ability.notes && <span>{ability.notes}</span>}
        </div>
      </TooltipStyled>
      {ability.talentPoints && (
        <div
          className="absolute rounded bottom-0 right-2 text-white"
          style={{ WebkitTextStroke: '1px yellow' }}
        >
          {ability.talentPoints}
        </div>
      )}
      {isSelected && (
        <div
          className="absolute rounded icon-highlight"
          style={{ height: iconSize, width: iconSize }}
        />
      )}
      <Image
        className={`rounded border-2 border-gray-600`}
        size={iconSize}
        src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
        alt={ability.name}
      />
    </div>
  )
}
