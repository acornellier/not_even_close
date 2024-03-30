import { Ability } from './ability'
import { EnemyAbility } from './dungeons'

import { EnemyAbilityDetails } from './sim/simTypes'

export function roundTo(number: number, to: number) {
  return Math.round(number * 10 ** to) / 10 ** to
}

export function isAbilitySelected(spellId: number, selectedAbilities: Ability[]) {
  return selectedAbilities.some((selectedAbility) => selectedAbility.spellId === spellId)
}

export function augmentAbilities(abilities: Ability[], selectedAbilities: Ability[]) {
  return abilities.map((specAbility) => {
    const augmentedAbility = { ...specAbility }

    abilities.forEach(({ spellId, abilityAugmentations }) => {
      if (!abilityAugmentations || !isAbilitySelected(spellId, selectedAbilities)) return

      abilityAugmentations.forEach(({ otherSpellId, field, absorbField, value }) => {
        if (otherSpellId !== augmentedAbility.spellId) return

        if (field === 'absorb') {
          const absorb = augmentedAbility.absorb
          if (!absorb || !absorbField) return

          augmentedAbility.absorb = { ...absorb }

          augmentedAbility.absorb[absorbField] ??= 0
          if (absorbField === 'healthMultiplier')
            augmentedAbility.absorb[absorbField]! *= 1 + value
          else augmentedAbility.absorb[absorbField]! += value
        } else {
          augmentedAbility[field] ??= 0
          augmentedAbility[field]! += value
        }
      })
    })
    return augmentedAbility
  })
}

export function isAbilityAvailable(ability: Ability, availableAbililties: Ability[]) {
  return availableAbililties.some(
    (availableAbility) => availableAbility.spellId === ability.spellId
  )
}

export function enemyAbilityToDetails(ability: EnemyAbility): EnemyAbilityDetails {
  let damage = ability.baseDamage
  if (ability.variance) damage = Math.round(damage * (1 + ability.variance))

  return { ...ability, damage }
}
