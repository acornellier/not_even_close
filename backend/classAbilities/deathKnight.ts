import { Ability } from '../ability'

export const veteranOfTheThirdWar: Ability = {
  name: 'Veteran of the Third War',
  staminaIncrease: 0.2,
  onByDefault: true,
  spellId: 48263,
  iconName: 'spell_misc_warsongfocus',
}

export const antiMagicShell: Ability = {
  name: 'Anti-Magic Shell',
  absorb: 500_000,
  spellId: 48707,
  iconName: 'spell_shadow_antimagicshell',
  notes: "Assumes 500K absorb. In reality varies based on DK's HP and vers.",
}

export const iceboundFortitude: Ability = {
  name: 'Icebound Fortitude',
  dr: 0.3,
  spellId: 48792,
  iconName: 'spell_deathknight_iceboundfortitude',
}

export const deathKnightAbilities = [
  veteranOfTheThirdWar,
  antiMagicShell,
  iceboundFortitude,
]
