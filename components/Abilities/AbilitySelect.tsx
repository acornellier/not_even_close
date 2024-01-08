import { Ability } from '../../backend/ability'
import { augmentAbilities, isAbilitySelected } from '../../backend/utils'
import { AbilityIcon } from './AbilityIcon'

interface Props {
  allAbilities: Ability[]
  selectedAbilities: Ability[]
  setSelectedAbilities: (abilities: Ability[]) => void
}

export function AbilitySelect({
  allAbilities,
  selectedAbilities,
  setSelectedAbilities,
}: Props) {
  const augmentedAbilities = augmentAbilities(allAbilities, selectedAbilities)

  const toggleAbility = (spellId: number) => {
    if (isAbilitySelected(spellId, selectedAbilities)) {
      setSelectedAbilities(
        selectedAbilities.filter((selectedAbility) => selectedAbility.spellId !== spellId)
      )
    } else {
      const ability = allAbilities.find(
        ({ spellId: otherSpellId }) => otherSpellId === spellId
      )

      if (ability) setSelectedAbilities([...selectedAbilities, ability])
    }
  }

  const [augmenters, regulars] = (augmentedAbilities ?? allAbilities).reduce<
    [Ability[], Ability[]]
  >(
    (acc, ability) => {
      acc[ability.abilityAugmentations ? 0 : 1].push(ability)
      return acc
    },
    [[], []]
  )

  return (
    <div className="flex gap-2 flex-wrap">
      {augmenters.map((ability) => (
        <AbilityIcon
          key={ability.spellId}
          ability={ability}
          toggleAbility={toggleAbility}
          selectedAbilities={selectedAbilities}
          allAbilities={allAbilities}
        />
      ))}

      {augmenters.length > 0 && <div className="border-2 border-gray-300" />}

      {regulars.map((ability) => (
        <AbilityIcon
          key={ability.spellId}
          ability={ability}
          toggleAbility={toggleAbility}
          selectedAbilities={selectedAbilities}
          allAbilities={allAbilities}
        />
      ))}
    </div>
  )
}
