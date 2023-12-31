import { Ability, AbilityField, abilityFields } from '../../backend/ability'
import { Tooltip } from 'react-tooltip'
import { isAbilitySelected, roundTo } from '../../backend/utils'
import Image from 'next/image'
import { Fragment } from 'react'

const iconSize = 40

interface AbilityIconProps {
  ability: Ability
  toggleAbility: (spellId: number) => void
  selectedAbilities: Ability[]
  allAbilities: Ability[]
}

function getEffectText(field: AbilityField, value: number) {
  switch (field) {
    case 'dr':
      return `${roundTo(value * 100, 2)}% DR`
    case 'aoeDr':
      return `${roundTo(value * 100, 2)}% AoE DR`
    case 'healthIncrease':
      return `${roundTo(value * 100, 2)}% HP`
    case 'staminaIncrease':
      return `${roundTo(value * 100, 2)}% stamina`
    case 'versIncrease':
      return `${roundTo(value * 100, 2)}% versatility`
    case 'rawAbsorb':
      return `${value.toLocaleString('en-US')} HP absorb`
    case 'absorbHealthMultiplier':
      return `${roundTo(value * 100, 2)}% HP absorb`
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
}: AbilityIconProps) {
  const augmentedAbilities = ability.abilityAugmentations
    ? allAbilities.filter(({ spellId }) =>
        ability.abilityAugmentations?.some(
          (augmentation) => spellId === augmentation.otherSpellId
        )
      )
    : null

  const isSelected = isAbilitySelected(ability.spellId, selectedAbilities)

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
      <Tooltip
        id={`ability-tooltip-${ability.spellId}`}
        className="z-10 max-w-sm"
        opacity={1}
        place="right"
      >
        <div className="flex flex-col">
          <span className="text-xl">{ability.name}</span>
          {abilityFields.map(
            (field) =>
              ability[field] && (
                <span key={field}>
                  {getEffectText(field, ability[field]!)}{' '}
                  {field === 'absorbHealthMultiplier' &&
                    ability.absorbVersAffected &&
                    ' (+vers)'}
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
                  {abilityFields.map(
                    (field) =>
                      augmentation.field === field && (
                        <span key={field}>
                          +{getEffectText(field, augmentation.value)}
                        </span>
                      )
                  )}
                </span>
              </Fragment>
            )
          })}
          {ability.notes && <span>{ability.notes}</span>}
        </div>
      </Tooltip>
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
          className="absolute rounded border-yellow-300 icon-highlight"
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
