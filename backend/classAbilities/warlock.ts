import { Ability } from '../ability'

export const darkPact: Ability = {
  name: 'Dark Pact',
  absorb: 550_000,
  spellId: 108416,
  iconName: 'spell_shadow_deathpact',
  notes:
    "Assumes 550K absorb. In reality varies based on Warlock's HP and Int.",
}

export const unendingResolve: Ability = {
  name: 'Unending Resolve',
  dr: 0.4,
  spellId: 104773,
  iconName: 'spell_shadow_demonictactics',
}

export const warlockAbilities = [darkPact, unendingResolve]
