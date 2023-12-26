import { Ability } from '../ability'

export const antiMagicShell: Ability = {
  name: 'Anti-Magic Shell',
  absorbHealthMultiplier: 0.483,
  spellId: 48707,
  iconName: 'spell_shadow_antimagicshell',
  notes: 'Assumes you have Anti-Magic Barrier and Gloom Ward',
}

export const iceboundFortitude: Ability = {
  name: 'Icebound Fortitude',
  dr: 0.3,
  spellId: 48792,
  iconName: 'spell_deathknight_iceboundfortitude',
}

export const deathKnightAbilities = [antiMagicShell, iceboundFortitude]
