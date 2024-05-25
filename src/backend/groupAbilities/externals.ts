import type { Ability } from '../ability'

export const tepidVersatility: Ability = {
  name: 'Phial of Tepid Versatility',
  spellId: 371172,
  versRawIncrease: 745,
  iconName: 'inv_10_alchemy_bottle_shape2_black',
  notes: '3.63% vers = 1.82% DR when below 30% vers',
}

const icyPreservation: Ability = {
  name: 'Phial of Icy Preservation',
  spellId: 191326,
  dr: 0.06,
  iconName: 'inv_10_alchemy_bottle_shape2_blue',
  wowheadLink: 'https://www.wowhead.com/item=191326/phial-of-icy-preservation',
}

const blessingOfSacrifice: Ability = {
  name: 'Blessing of Sacrifice',
  spellId: 6940,
  dr: 0.3,
  associatedClass: 'Paladin',
  iconName: 'spell_holy_sealofsacrifice',
  wowheadLink: 'https://www.wowhead.com/spell=6940/blessing-of-sacrifice',
  notes: 'Wrong for holy paladin where it is actually 32%',
}

const ironBark: Ability = {
  name: 'Ironbark',
  spellId: 102342,
  dr: 0.2,
  associatedSpec: { class: 'Druid', spec: 'Restoration' },
  iconName: 'spell_druid_ironbark',
  wowheadLink: 'https://www.wowhead.com/spell=102342/ironbark',
}

const painSuppression: Ability = {
  name: 'Pain Suppression',
  spellId: 33206,
  dr: 0.4,
  associatedSpec: { class: 'Priest', spec: 'Discipline' },
  iconName: 'spell_holy_painsupression',
  wowheadLink: 'https://www.wowhead.com/spell=33206/pain-suppression',
}

const lifeCocoon: Ability = {
  name: 'Life Cocoon',
  spellId: 116849,
  associatedSpec: { class: 'Monk', spec: 'Mistweaver' },
  absorb: {
    healthMultiplier: 0.8,
    versAffected: true,
    backup: 1_400_000,
  },
  iconName: 'ability_monk_chicocoon',
  notes: 'Assumes 1.4M absorb if you have no mistweaver selected',
}

const rescue: Ability = {
  name: 'Rescue',
  spellId: 370888,
  associatedClass: 'Evoker',
  absorb: {
    healthMultiplier: 0.3,
    versAffected: true,
    backup: 400_000,
  },
  iconName: 'ability_skyreach_shielded',
  notes: 'Assumes 400K absorb if you have no evoker selected',
}

const wardOfFacelessIre: Ability = {
  name: 'Ward of Faceless Ire',
  spellId: 401238,
  absorb: {
    raw: 618887,
    versAffected: true,
  },
  iconName: 'inv_10_dungeonjewelry_dragon_trinket_2arcanemagical_green',
  notes: 'Assumes ilvl 522, Hero 6/6',
}

const fyrakksTaintedRageheart: Ability = {
  name: "Fyrakk's Tainted Rageheart",
  spellId: 422750,
  absorb: {
    raw: 1_394_780,
    versAffected: true,
  },
  iconName: 'inv_ragnaros_heart_shadowflame',
  notes: 'Assumes ilvl 525',
}

const ancestralVigor: Ability = {
  name: 'Ancestral Vigor',
  healthIncrease: 0.05,
  stacks: { type: 'talent', max: 2 },
  spellId: 207401,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  iconName: 'spell_shaman_blessingoftheeternals',
}

const earthenHarmony: Ability = {
  name: 'Earthen Harmony',
  dr: 0.03,
  stacks: { type: 'talent', max: 2 },
  spellId: 382020,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  iconName: 'spell_shaman_improvedearthshield',
}

const timeDilation: Ability = {
  name: 'Time Dilation',
  dr: 0.5,
  spellId: 357170,
  iconName: 'ability_evoker_timedilation',
}

const blisteringScales: Ability = {
  name: 'Blistering Scales',
  spellId: 360827,
  armorRawIncrease: Math.round(17818 * 0.3),
  iconName: 'ability_evoker_blisteringscales',
  notes: 'NOT EXACT. Based on an evoker at 526 ilvl',
}

export const aaVersBuff: Ability = {
  name: 'Algethar Vers Buff',
  versIncrease: 0.05,
  spellId: 389501,
  iconName: 'inv_bijou_red',
}

export const externals: Ability[] = [
  tepidVersatility,
  icyPreservation,
  ancestralVigor,
  earthenHarmony,
  ironBark,
  blessingOfSacrifice,
  painSuppression,
  timeDilation,
  lifeCocoon,
  rescue,
  blisteringScales,
  wardOfFacelessIre,
  fyrakksTaintedRageheart,
]
