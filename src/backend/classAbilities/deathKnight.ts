import type { Ability } from '../ability'

export const willOfTheNecropolis: Ability = {
  name: 'Will of the Necropolis',
  id: 206967,
  stacks: { type: 'talent', max: 2 },
  icon: 'achievement_boss_kelthuzad_01',
  notes: 'Damage below 30% Health is reduced by 20/35%',
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

const runeTap: Ability = {
  name: 'Rune Tap',
  id: 194679,
  dr: 0.2,
  icon: 'spell_deathknight_runetap',
}

const tombstone: Ability = {
  name: 'Tombstone',
  id: 219809,
  absorb: {
    healthMultiplier: 0.3,
    versAffected: true,
  },
  icon: 'ability_fiegndead',
  notes: 'Assumes you consumed 5 stacks of Bone Shield',
}

const foulBulwark: Ability = {
  name: 'Foul Bulwark',
  id: 206974,
  healthIncrease: 0.01,
  stacks: {
    type: 'stacks',
    max: 10,
  },
  icon: 'inv_armor_shield_naxxramas_d_02',
}

const vampiricBlood: Ability = {
  name: 'Vampiric Blood',
  id: 55233,
  healthIncrease: 0.3,
  icon: 'spell_shadow_lifedrain',
}

const ashenDecay: Ability = {
  name: 'Ashen Decay (S3 2pc)',
  id: 425719,
  damageDealtReduction: 0.1,
  icon: 'spell_holy_ashestoashes',
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
    {
      otherSpellId: tombstone.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.15,
    },
  ],
}

const nullMagic: Ability = {
  name: 'Null Magic',
  id: 454842,
  icon: 'spell_shadow_detectinvisibility',
  dr: 0.1,
  drType: 'magic',
}

export const deathKnightAbilities = [
  antiMagicBarrier,
  gloomWard,
  nullMagic,
  willOfTheNecropolis,
  lichborne,
  antiMagicShell,
  iceboundFortitude,
]

export const deathKnightBloodAbilities = [
  antiMagicBarrier,
  gloomWard,
  nullMagic,
  willOfTheNecropolis,
  foulBulwark,
  ashenDecay,
  lichborne,
  antiMagicShell,
  iceboundFortitude,
  vampiricBlood,
  tombstone,
  runeTap,
]
