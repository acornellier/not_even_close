import type { Ability, SelectedAbility } from '../../backend/ability'
import { abilityEffectFields } from '../../backend/ability'
import { augmentAbilities, getSelectedAbility } from '../../util/utils.ts'
import { CharAbilityIcon } from './CharAbilityIcon'
import { dampenHarm } from '../../backend/classAbilities/monk.ts'
import { willOfTheNecropolis } from '../../backend/classAbilities/deathKnight.ts'
import { useAbilitySetters } from './useAbilitySetters.ts'

interface Props {
  availableAbilities: Ability[]
  selectedAbilities: SelectedAbility[]
  setSelectedAbilities: (abilities: SelectedAbility[]) => void
  characterIdx?: number
}

function isAugmenter(ability: Ability) {
  if ([dampenHarm.id, willOfTheNecropolis.id].includes(ability.id)) return false

  return (
    ability.abilityAugmentations && !abilityEffectFields.some((field) => ability[field])
  )
}

export function AbilitySelect({
  availableAbilities,
  selectedAbilities,
  setSelectedAbilities,
  characterIdx,
}: Props) {
  const { toggleAbility, setAbilityStacks } = useAbilitySetters({
    selectedAbilities,
    availableAbilities,
    setSelectedAbilities,
  })

  const augmentedAbilities = augmentAbilities(availableAbilities, selectedAbilities)

  const [augmenters, regulars] = (augmentedAbilities ?? availableAbilities).reduce<
    [Ability[], Ability[]]
  >(
    (acc, ability) => {
      acc[isAugmenter(ability) ? 0 : 1].push(ability)
      return acc
    },
    [[], []],
  )

  return (
    <div className="flex gap-1.5 flex-wrap">
      {augmenters.map((ability) => (
        <CharAbilityIcon
          key={ability.id}
          ability={ability}
          selectedAbility={getSelectedAbility(ability.id, selectedAbilities)}
          toggleAbility={toggleAbility}
          setAbilityStacks={setAbilityStacks}
          allAbilities={availableAbilities}
          characterIdx={characterIdx}
        />
      ))}

      {augmenters.length > 0 && <div className="border-2 border-gray-300" />}

      {regulars.map((ability) => (
        <CharAbilityIcon
          key={ability.id}
          ability={ability}
          selectedAbility={getSelectedAbility(ability.id, selectedAbilities)}
          toggleAbility={toggleAbility}
          setAbilityStacks={setAbilityStacks}
          allAbilities={availableAbilities}
          characterIdx={characterIdx}
        />
      ))}
    </div>
  )
}
