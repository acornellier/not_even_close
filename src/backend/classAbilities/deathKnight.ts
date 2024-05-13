import type { Ability } from '../ability'

export const willOfTheNecropolis: Ability = {
  name: 'Will of the Necropolis',
  spellId: 206967,
  iconName: 'achievement_boss_kelthuzad_01',
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
  iconName: 'spell_shadow_antimagicshell',
}

const antiMagicBarrier: Ability = {
  name: 'Anti-Magic Barrier',
  spellId: 205727,
  onByDefault: true,
  iconName: 'spell_shadow_antimagicshell',
  abilityAugmentations: [
    {
      otherSpellId: antiMagicShell.spellId,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.4,
    },
  ],
}

const iceboundFortitude: Ability = {
  name: 'Icebound Fortitude',
  dr: 0.3,
  spellId: 48792,
  iconName: 'spell_deathknight_iceboundfortitude',
}

const lichborne: Ability = {
  name: 'Lichborne',
  dr: 0.15,
  spellId: 49039,
  iconName: 'spell_shadow_raisedead',
}

const runeTap: Ability = {
  name: 'Rune Tap',
  spellId: 194679,
  dr: 0.2,
  iconName: 'spell_deathknight_runetap',
}

const tombstone: Ability = {
  name: 'Tombstone',
  spellId: 219809,
  absorb: {
    healthMultiplier: 0.3,
    versAffected: true,
  },
  iconName: 'ability_fiegndead',
  notes: 'Assumes you consumed 5 stacks of Bone Shield',
}

const foulBulwark: Ability = {
  name: 'Foul Bulwark',
  spellId: 206974,
  healthIncrease: 0.01,
  stacks: {
    maxStacks: 10,
  },
  iconName: 'inv_armor_shield_naxxramas_d_02',
}

const vampiricBlood: Ability = {
  name: 'Vampiric Blood',
  spellId: 55233,
  healthIncrease: 0.3,
  iconName: 'spell_shadow_lifedrain',
}

const gloomWard: Ability = {
  name: 'Gloom Ward',
  spellId: 391571,
  onByDefault: true,
  iconName: 'ability_rogue_envelopingshadows',
  abilityAugmentations: [
    {
      otherSpellId: antiMagicShell.spellId,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.15,
    },
    {
      otherSpellId: tombstone.spellId,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.15,
    },
  ],
}

export const deathKnightAbilities = [
  antiMagicBarrier,
  gloomWard,
  willOfTheNecropolis,
  lichborne,
  antiMagicShell,
  iceboundFortitude,
]

export const deathKnightBloodAbilities = [
  antiMagicBarrier,
  gloomWard,
  willOfTheNecropolis,
  lichborne,
  antiMagicShell,
  iceboundFortitude,
  vampiricBlood,
  tombstone,
  runeTap,
  // foulBulwark,
]
