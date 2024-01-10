import { Ability } from '../ability'

export const defensiveStance: Ability = {
  name: 'Defensive Stance',
  dr: 0.15,
  spellId: 197690,
  iconName: 'ability_warrior_defensivestance',
}

export const spellReflection: Ability = {
  name: 'Spell Reflection',
  dr: 0.2,
  spellId: 23920,
  iconName: 'ability_warrior_shieldreflection',
}

export const enragedRegeneration: Ability = {
  name: 'Enraged Regeneration',
  dr: 0.3,
  spellId: 184364,
  iconName: 'ability_warrior_focusedrage',
}

export const dieByTheSword: Ability = {
  name: 'Die by the Sword',
  dr: 0.3,
  spellId: 118038,
  iconName: 'ability_warrior_challange',
}

export const warpaint: Ability = {
  name: 'Warpaint',
  dr: 0.1,
  spellId: 208154,
  iconName: 'ability_rogue_preparation',
  notes: 'Enrage is usually active, but not always',
}

export const warriorArmsAbilities = [defensiveStance, spellReflection, dieByTheSword]

export const warriorFuryAbilities = [
  defensiveStance,
  warpaint,
  spellReflection,
  enragedRegeneration,
]
