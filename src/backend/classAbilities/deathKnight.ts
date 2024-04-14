import { Ability } from '../ability'

export const willOfTheNecropolis: Ability = {
  name: 'Will of the Necropolis',
  spellId: 206967,
  icon: 'achievement_boss_kelthuzad_01',
  notes: 'Damage below 30% Health is reduced by 35%',
}

const antiMagicShell: Ability = {
  name: 'Anti-Magic Shell',
  spellId: 48707,
  absorb: {
    healthMultiplier: 0.3,
    absorbType: 'magic',
    versAffected: true,
  },
  icon: 'spell_shadow_antimagicshell',
}

const antiMagicBarrier: Ability = {
  name: 'Anti-Magic Barrier',
  spellId: 205727,
  onByDefault: true,
  icon: 'spell_shadow_antimagicshell',
  abilityAugmentations: [
    {
      otherSpellId: antiMagicShell.spellId,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.4,
    },
  ],
}

const gloomWard: Ability = {
  name: 'Gloom Ward',
  spellId: 391571,
  onByDefault: true,
  icon: 'ability_rogue_envelopingshadows',
  abilityAugmentations: [
    {
      otherSpellId: antiMagicShell.spellId,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.15,
    },
  ],
}

const iceboundFortitude: Ability = {
  name: 'Icebound Fortitude',
  dr: 0.3,
  spellId: 48792,
  icon: 'spell_deathknight_iceboundfortitude',
}

const lichborne: Ability = {
  name: 'Lichborne',
  dr: 0.15,
  spellId: 49039,
  icon: 'spell_shadow_raisedead',
}

export const deathKnightAbilities = [
  antiMagicBarrier,
  gloomWard,
  willOfTheNecropolis,
  lichborne,
  antiMagicShell,
  iceboundFortitude,
]
