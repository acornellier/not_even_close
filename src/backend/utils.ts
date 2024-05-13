import type { Ability, SelectedAbility } from './ability'
import type { EnemyAbility } from './enemyAbilities/enemies'

import type { EnemyAbilityDetails } from './sim/simTypes'

export function roundTo(number: number, to: number) {
  return Math.round(number * 10 ** to) / 10 ** to
}

export function thousands(number: number) {
  return `${Math.round(number / 1000).toLocaleString('en-US')}K`
}

export function getSelectedAbility(
  spellId: number,
  selectedAbilities: SelectedAbility[],
) {
  return selectedAbilities.find(({ ability }) => ability.spellId === spellId)
}

export function isAbilitySelected(spellId: number, selectedAbilities: SelectedAbility[]) {
  return !!getSelectedAbility(spellId, selectedAbilities)
}

function augmentAbility(
  augmentedAbility: Ability,
  augmentingAbility: Ability,
  selectedAbilities: SelectedAbility[],
) {
  if (
    !augmentingAbility.abilityAugmentations ||
    !isAbilitySelected(augmentedAbility.spellId, selectedAbilities)
  )
    return

  augmentingAbility.abilityAugmentations.forEach(
    ({ otherSpellId, field, absorbField, value }) => {
      if (otherSpellId !== augmentedAbility.spellId) return

      if (field === 'absorb') {
        const absorb = augmentedAbility.absorb
        if (!absorb || !absorbField) return

        augmentedAbility.absorb = { ...absorb }

        augmentedAbility.absorb[absorbField] ??= 0
        if (absorbField === 'healthMultiplier') {
          augmentedAbility.absorb[absorbField]! *= 1 + value
        } else {
          augmentedAbility.absorb[absorbField]! += value
        }
      } else {
        augmentedAbility[field] ??= 0
        augmentedAbility[field]! += value
      }
    },
  )
}

export function augmentAbilities(
  abilities: Ability[],
  selectedAbilities: SelectedAbility[],
) {
  return abilities.map<Ability>((ability) => {
    const augmentedAbility = { ...ability }

    abilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility, selectedAbilities),
    )

    return augmentedAbility
  })
}

export function augmentSelectedAbilities(
  abilities: SelectedAbility[],
  selectedAbilities: SelectedAbility[],
) {
  return abilities.map<SelectedAbility>((ability) => {
    const augmentedAbility = { ...ability.ability }

    abilities.forEach((augmentingAbility) =>
      augmentAbility(augmentedAbility, augmentingAbility.ability, selectedAbilities),
    )

    return { ...ability, ability: augmentedAbility }
  })
}

export function isAbilityAvailable(ability: Ability, availableAbililties: Ability[]) {
  return availableAbililties.some(
    (availableAbility) => availableAbility.spellId === ability.spellId,
  )
}

export function enemyAbilityToDetails(ability: EnemyAbility): EnemyAbilityDetails {
  let damage = ability.damage
  if (ability.variance) damage = Math.round(damage * (1 + ability.variance))

  return { ...ability, damage }
}
