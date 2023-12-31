﻿import { Ability } from './ability'

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

      abilityAugmentations.forEach((abilityAugmentation) => {
        if (abilityAugmentation?.otherSpellId === augmentedAbility.spellId) {
          augmentedAbility[abilityAugmentation.field] ??= 0
          augmentedAbility[abilityAugmentation.field]! += abilityAugmentation.value
        }
      })
    })
    return augmentedAbility
  })
}
