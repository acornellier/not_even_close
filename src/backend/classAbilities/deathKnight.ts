import { Ability } from '../ability'

export const willOfTheNecropolis: Ability = {
  name: 'Will of the Necropolis',
  id: 206967,
  icon: 'achievement_boss_kelthuzad_01',
  notes: 'Damage below 30% Health is reduced by 35%',
}

const antiMagicShell: Ability = {
  name: 'Anti-Magic Shell',
  id: 48707,
  absorb: {
    healthMultiplier: 0.3,
    absorbType: 'magic',
    versAffected: true,
  },
  icon: 'spell_shadow_antimagicshell',
}

const antiMagicBarrier: Ability = {
  name: 'Anti-Magic Barrier',
  id: 205727,
  onByDefault: true,
  icon: 'spell_shadow_antimagicshell',
  abilityAugmentations: [
    {
      otherSpellId: antiMagicShell.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.4,
    },
  ],
}

const gloomWard: Ability = {
  name: 'Gloom Ward',
  id: 391571,
  onByDefault: true,
  icon: 'ability_rogue_envelopingshadows',
  abilityAugmentations: [
    {
      otherSpellId: antiMagicShell.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.15,
    },
  ],
}

const iceboundFortitude: Ability = {
  name: 'Icebound Fortitude',
  dr: 0.3,
  id: 48792,
  icon: 'spell_deathknight_iceboundfortitude',
}

const lichborne: Ability = {
  name: 'Lichborne',
  dr: 0.15,
  id: 49039,
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
