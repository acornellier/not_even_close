import type { Ability } from '../ability'

export const temperedVersatility: Ability = {
  name: 'Flask of Tempered Versatility',
  id: 431973,
  versRawIncrease: 2825,
  icon: 'inv_misc_potiona2',
}

const blessingOfSacrifice: Ability = {
  name: 'Blessing of Sacrifice',
  id: 6940,
  dr: 0.3,
  associatedClass: 'Paladin',
  icon: 'spell_holy_sealofsacrifice',
}

const echoingBlessings: Ability = {
  name: 'Echoing Blessings',
  id: 387801,
  icon: 'achievement_dungeon_heroic_gloryoftheraider',
  associatedSpec: { class: 'Paladin', spec: 'Holy' },
  notes: 'Not 15% because of diminishing returns',
  abilityAugmentations: [
    {
      otherAbilityId: blessingOfSacrifice.id,
      field: 'dr',
      value: 0.105,
    },
  ],
}

const ironBark: Ability = {
  name: 'Ironbark',
  id: 102342,
  dr: 0.2,
  associatedSpec: { class: 'Druid', spec: 'Restoration' },
  icon: 'spell_druid_ironbark',
}

const painSuppression: Ability = {
  name: 'Pain Suppression',
  id: 33206,
  dr: 0.4,
  associatedSpec: { class: 'Priest', spec: 'Discipline' },
  icon: 'spell_holy_painsupression',
}

const foreseenCircumstances: Ability = {
  name: 'Foreseen Circumstances',
  id: 440738,
  icon: 'spell_holy_guardianspirit',
  heroTree: 'Oracle',
  abilityAugmentations: [
    {
      otherAbilityId: painSuppression.id,
      field: 'dr',
      value: 0.1,
    },
  ],
}

const lifeCocoon: Ability = {
  name: 'Life Cocoon',
  id: 116849,
  associatedSpec: { class: 'Monk', spec: 'Mistweaver' },
  absorb: {
    healthMultiplier: 0.864,
    versAffected: true,
  },
  icon: 'ability_monk_chicocoon',
  notes:
    'Assumes Calming Coalescence is talented. Assumes {{backup}} absorb if you have no mistweaver selected. Probably more since it scales with vers.',
}

const rescue: Ability = {
  name: 'Rescue',
  id: 370888,
  associatedClass: 'Evoker',
  absorb: {
    healthMultiplier: 0.3,
    versAffected: true,
  },
  icon: 'ability_skyreach_shielded',
  notes:
    'Assumes {{backup}} absorb if you have no Evoker selected. Probably more since it scales with vers.',
}

const elusiveMists: Ability = {
  name: 'Elusive Mists',
  id: 388681,
  icon: 'ability_monk_soothingmists',
  dr: 0.06,
}

const earthenHarmony: Ability = {
  name: 'Earthen Harmony',
  dr: 0.03,
  id: 382020,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  icon: 'spell_shaman_improvedearthshield',
}

const timeDilation: Ability = {
  name: 'Time Dilation',
  id: 357170,
  icon: 'ability_evoker_timedilation',
  dr: 0.5,
}

export const externals: Ability[] = [
  temperedVersatility,
  elusiveMists,
  lifeCocoon,
  earthenHarmony,
  ironBark,
  blessingOfSacrifice,
  echoingBlessings,
  painSuppression,
  foreseenCircumstances,
  timeDilation,
  rescue,
]
