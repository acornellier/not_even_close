import type { Ability } from '../ability'

const blessingOfSacrifice: Ability = {
  name: 'Blessing of Sacrifice',
  id: 6940,
  dr: 0.3,
  associatedClass: 'Paladin',
  icon: 'spell_holy_sealofsacrifice',
  notes: 'Wrong for holy paladin where it is actually 32%',
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

const lifeCocoon: Ability = {
  name: 'Life Cocoon',
  id: 116849,
  associatedSpec: { class: 'Monk', spec: 'Mistweaver' },
  absorb: {
    healthMultiplier: 0.8,
    versAffected: true,
    backup: 1_400_000,
  },
  icon: 'ability_monk_chicocoon',
  notes: 'Assumes 1.4M absorb if you have no mistweaver selected',
}

const rescue: Ability = {
  name: 'Rescue',
  id: 370888,
  associatedClass: 'Evoker',
  absorb: {
    healthMultiplier: 0.3,
    versAffected: true,
    backup: 400_000,
  },
  icon: 'ability_skyreach_shielded',
  notes: 'Assumes 400K absorb if you have no evoker selected',
}

const elusiveMists: Ability = {
  name: 'Elusive Mists',
  id: 388681,
  icon: 'ability_monk_soothingmists',
  dr: 0.06,
}

const ancestralVigor: Ability = {
  name: 'Ancestral Vigor',
  healthIncrease: 0.05,
  stacks: { type: 'talent', max: 2 },
  id: 207401,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  icon: 'spell_shaman_blessingoftheeternals',
}

const earthenHarmony: Ability = {
  name: 'Earthen Harmony',
  dr: 0.03,
  stacks: { type: 'talent', max: 2 },
  id: 382020,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  icon: 'spell_shaman_improvedearthshield',
}

const timeDilation: Ability = {
  name: 'Time Dilation',
  dr: 0.5,
  id: 357170,
  icon: 'ability_evoker_timedilation',
}

const blisteringScales: Ability = {
  name: 'Blistering Scales',
  id: 360827,
  armorRawIncrease: Math.round(17818 * 0.3),
  icon: 'ability_evoker_blisteringscales',
  notes: 'NOT EXACT. Based on an evoker at 526 ilvl',
}

export const externals: Ability[] = [
  elusiveMists,
  ancestralVigor,
  earthenHarmony,
  ironBark,
  blessingOfSacrifice,
  painSuppression,
  timeDilation,
  lifeCocoon,
  rescue,
  blisteringScales,
]
