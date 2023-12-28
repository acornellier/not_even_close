import { Ability } from './ability'

export const icyPreservation: Ability = {
  name: 'Icy Preservation',
  spellId: 191326,
  dr: 0.06,
  iconName: 'inv_10_alchemy_bottle_shape2_blue',
  wowheadLink: 'https://www.wowhead.com/item=191326/phial-of-icy-preservation',
}

export const fortitude: Ability = {
  name: 'Power Word: Fortitude',
  spellId: 21562,
  staminaIncrease: 0.05,
  iconName: 'spell_holy_wordfortitude',
  wowheadLink: 'https://www.wowhead.com/spell=21562/power-word-fortitude',
}

export const generousPour: Ability = {
  name: 'Generous Pour',
  spellId: 389575,
  aoeDr: 0.04,
  iconName: 'inv_misc_food_legion_goocaramel_bottle',
  wowheadLink: 'https://www.wowhead.com/spell=389575/generous-pour?def=106502&rank=2',
}

export const blackAttunement: Ability = {
  name: 'Black Attunement',
  spellId: 403264,
  healthIncrease: 0.04,
  iconName: 'ability_evoker_blackattunement',
  wowheadLink: 'https://www.wowhead.com/spell=403264/black-attunement',
}

export const devotionAura: Ability = {
  name: 'Devotion Aura',
  spellId: 465,
  dr: 0.03,
  iconName: 'spell_holy_devotionaura',
  wowheadLink: 'https://www.wowhead.com/spell=465/devotion-aura',
}

export const markOfTheWild: Ability = {
  name: 'Mark of the Wild',
  spellId: 1126,
  versIncrease: 0.03,
  iconName: 'spell_nature_regeneration',
  wowheadLink: 'https://www.wowhead.com/spell=1126/mark-of-the-wild',
}

export const atrophicPoison: Ability = {
  name: 'Atrophic Poison',
  dr: 0.036,
  spellId: 381637,
  wowheadLink: 'https://www.wowhead.com/spell=381637/atrophic-poison',
  iconName: 'ability_rogue_nervesofsteel',
  notes: 'Assumes you have Master Poisoner.\nDoes not necessarily work on all abilities',
}

export const aspectsFavor: Ability = {
  name: "Aspects' Favor",
  spellId: 407243,
  healthIncrease: 0.04,
  iconName: 'ability_evoker_aspectsfavor',
  wowheadLink: 'https://www.wowhead.com/spell=407243/aspects-favor?rank=2',
  notes: 'Assumes you already have Black Attunement selected',
}

export const zephyr: Ability = {
  name: 'Zephyr',
  spellId: 374227,
  aoeDr: 0.2,
  iconName: 'ability_evoker_hoverblack',
  wowheadLink: 'https://www.wowhead.com/spell=374227/zephyr',
}

export const chiCocoon: Ability = {
  name: 'Chi Cocoon',
  spellId: 406220,
  rawAbsorb: 170_000,
  iconName: 'inv_pet_crane',
  wowheadLink: 'https://www.wowhead.com/spell=406220/chi-cocoon',
  notes: "Assumes 170K absorb. In reality varies based on Monk's HP and vers.",
}

export const massBarrier: Ability = {
  name: 'Mass Barrier',
  spellId: 414660,
  rawAbsorb: 200_000,
  iconName: 'ability_racial_magicalresistance',
  wowheadLink: 'https://www.wowhead.com/spell=414660/mass-barrier',
  notes: "Assumes 200K absorb. In reality varies based on Mage's HP and vers.",
}

export const rallyingCry: Ability = {
  name: 'Rallying Cry',
  spellId: 97462,
  healthIncrease: 0.1,
  iconName: 'ability_warrior_rallyingcry',
  wowheadLink: 'https://www.wowhead.com/spell=97462/rallying-cry',
}

export const auraMastery: Ability = {
  name: 'Aura Mastery',
  spellId: 31821,
  dr: 0.09,
  iconName: 'spell_holy_auramastery',
  wowheadLink: 'https://www.wowhead.com/spell=31821/aura-mastery',
  notes: 'Assumes you already have 3% devo aura',
}

export const powerWordBarrier: Ability = {
  name: 'Power Word: Barrier',
  spellId: 62618,
  dr: 0.2,
  iconName: 'spell_holy_powerwordbarrier',
  wowheadLink: 'https://www.wowhead.com/spell=62618/power-word-barrier',
}

export const antiMagicZone: Ability = {
  name: 'Anti-Magic Zone',
  spellId: 51052,
  dr: 0.2,
  iconName: 'spell_deathknight_antimagiczone',
  wowheadLink: 'https://www.wowhead.com/spell=51052/anti-magic-zone',
}

export const spiritLinkTotem: Ability = {
  name: 'Spirit Link Totem',
  spellId: 98008,
  dr: 0.1,
  iconName: 'spell_shaman_spiritlink',
}

export const blessingOfSacrifice: Ability = {
  name: 'Blessing of Sacrifice',
  spellId: 6940,
  dr: 0.3,
  iconName: 'spell_holy_sealofsacrifice',
  wowheadLink: 'https://www.wowhead.com/spell=6940/blessing-of-sacrifice',
  notes: 'Wrong for holy paladin where it is actually 32%',
}

export const blessingOfProtection: Ability = {
  name: 'Blessing of Protection',
  spellId: 1022,
  dr: 0.15,
  iconName: 'spell_holy_sealofprotection',
  notes: 'Requires a holy paladin with Echoing Blessings',
}

export const ironBark: Ability = {
  name: 'Ironbark',
  spellId: 102342,
  dr: 0.2,
  iconName: 'spell_druid_ironbark',
  wowheadLink: 'https://www.wowhead.com/spell=102342/ironbark',
}

export const painSuppression: Ability = {
  name: 'Pain Suppression',
  spellId: 33206,
  dr: 0.4,
  iconName: 'spell_holy_painsupression',
  wowheadLink: 'https://www.wowhead.com/spell=33206/pain-suppression',
}

export const lifeCocoon: Ability = {
  name: 'Life Cocoon',
  spellId: 116849,
  rawAbsorb: 1_000_000,
  iconName: 'ability_monk_chicocoon',
  notes: "Assumes 1M absorb. In reality varies based on monk's HP and vers",
}

export const groupBuffs: Ability[] = [
  blackAttunement,
  devotionAura,
  generousPour,
  fortitude,
  markOfTheWild,
  atrophicPoison,
]

export const groupActives: Ability[] = [
  aspectsFavor,
  zephyr,
  chiCocoon,
  massBarrier,
  rallyingCry,
  auraMastery,
  spiritLinkTotem,
  powerWordBarrier,
  antiMagicZone,
]

export const otherBuffs: Ability[] = [
  icyPreservation,
  ironBark,
  blessingOfSacrifice,
  blessingOfProtection,
  painSuppression,
  lifeCocoon,
]
