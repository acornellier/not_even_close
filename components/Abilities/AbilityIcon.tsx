import { Ability, AbilityField, abilityFields } from '../../backend/ability'
import { isAbilitySelected, roundTo } from '../../backend/utils'
import Image from 'next/image'
import { Fragment } from 'react'
import { getHealthMultiplierAbsorb } from '../../backend/sim'
import { useSimContext } from '../Tools/SimContext'
import { Character } from '../../backend/characters'
import { equalSpecs } from '../../backend/classes'
import { TooltipStyled } from '../Common/TooltipStyled'

const iconSize = 40

interface AbilityIconProps {
  ability: Ability
  toggleAbility: (spellId: number) => void
  selectedAbilities: Ability[]
  allAbilities: Ability[]
  character?: Character
}

function getEffectText(field: AbilityField, value: number, ability?: Ability) {
  if (ability?.name === 'Mass Barrier')
    console.log('getEffectText', field, value, ability?.name)
  const damageType = ability?.drType
  const absorbType = ability?.absorbType
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
    case 'rawAbsorb':
      return `${value.toLocaleString('en-US')} HP ${
        absorbType ? absorbType + ' ' : ''
      }absorb`
    case 'absorbHealthMultiplier':
      return `${roundTo(value * 100, 2)}% HP ${absorbType ? absorbType + ' ' : ''}absorb`
    default:
      console.error(`Unknown ability field: ${field}`)
      return 'Error'
  }
}

export function AbilityIcon({
  ability,
  toggleAbility,
  selectedAbilities,
  allAbilities,
  character,
}: AbilityIconProps) {
  const augmentedAbilities = ability.abilityAugmentations
    ? allAbilities.filter(({ spellId }) =>
        ability.abilityAugmentations?.some(
          (augmentation) => spellId === augmentation.otherSpellId
        )
      )
    : null

  const isSelected = isAbilitySelected(ability.spellId, selectedAbilities)

  const { result } = useSimContext()
  let calculatedAbsorb = 0
  if (result) {
    const resultChar = character
      ? result.main.characters.find(
          (char) => character.classSpec && equalSpecs(char.spec, character.classSpec)
        )
      : undefined

    calculatedAbsorb = getHealthMultiplierAbsorb(
      ability,
      resultChar?.adjustedStats ?? null,
      resultChar?.startingHealth ?? null,
      result.main.characters
    )
  }

  return (
    <div
      key={ability.spellId}
      data-tooltip-id={`ability-tooltip-${ability.spellId}`}
      className="cursor-pointer select-none relative"
      onClick={(e) => {
        e.preventDefault()
        toggleAbility(ability.spellId)
      }}
    >
      <TooltipStyled id={`ability-tooltip-${ability.spellId}`}>
        <div className="flex flex-col">
          <span className="text-xl">{ability.name}</span>
          {abilityFields.map(
            (field) =>
              ability[field] && (
                <span key={field}>
                  {getEffectText(field, ability[field]!, ability)}{' '}
                  {(field === 'absorbHealthMultiplier' || field === 'rawAbsorb') &&
                    ability.absorbVersAffected &&
                    ' (+vers)'}
                  {field === 'absorbHealthMultiplier' &&
                    calculatedAbsorb &&
                    ` - ${calculatedAbsorb.toLocaleString('en-US')} absorb`}
                </span>
              )
          )}
          {augmentedAbilities?.map((augmentedAbility) => {
            const augmentation = ability.abilityAugmentations?.find(
              (augmentation) => augmentation.otherSpellId === augmentedAbility.spellId
            )
            if (!augmentation) return null

            return (
              <Fragment key={augmentedAbility.spellId}>
                <span>
                  Improves {augmentedAbility.name}:{' '}
                  {augmentation.field !== 'absorbHealthMultiplier'
                    ? `+${getEffectText(augmentation.field, augmentation.value)}`
                    : `${augmentation.value * 100}% more absorb`}
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
        height={iconSize}
        width={iconSize}
        src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
        alt={ability.name}
      />
    </div>
  )
}
