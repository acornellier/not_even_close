import { Ability } from '../ability'

export const antiMagicShell: Ability = {
  name: 'Anti-Magic Shell',
  absorbHealthMultiplier: 0.483,
  absorbVersAffected: true,
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

export const lichborne: Ability = {
  name: 'Lichborne',
  dr: 0.15,
  spellId: 49039,
  iconName: 'spell_shadow_raisedead',
}

export const deathKnightAbilities = [antiMagicShell, iceboundFortitude, lichborne]
