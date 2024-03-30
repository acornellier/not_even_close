import { Ability } from '../ability'
import {
  improvedPrismaticBarrier,
  improvedPrismaticBarrierAugmentation,
  prismaticBarrier,
} from '../classAbilities/mage'

export const zephyr: Ability = {
  name: 'Zephyr',
  spellId: 374227,
  aoeDr: 0.2,
  associatedClass: 'Evoker',
  iconName: 'ability_evoker_hoverblack',
  wowheadLink: 'https://www.wowhead.com/spell=374227/zephyr',
}

export const chiCocoon: Ability = {
  name: 'Chi Cocoon',
  spellId: 406220,
  associatedSpec: { class: 'Monk', spec: 'Mistweaver' },
  absorb: {
    healthMultiplier: 0.16,
    versAffected: true,
    backup: 170_000,
  },
  iconName: 'inv_pet_crane',
  wowheadLink: 'https://www.wowhead.com/spell=406220/chi-cocoon',
  notes: 'Assumes 170K absorb if you have no mistweaver selected',
}

export const massBarrier: Ability = {
  name: 'Mass Barrier',
  spellId: 414660,
  associatedClass: 'Mage',
  absorb: {
    healthMultiplier: 0.2,
    versAffected: true,
    backup: 200_000,
  },
  iconName: 'ability_racial_magicalresistance',
  wowheadLink: 'https://www.wowhead.com/spell=414660/mass-barrier',
  notes: 'Assumes 200K absorb if you have no mage selected',
}

export const arcaneMassBarrier: Ability = {
  ...massBarrier,
  name: 'Arcane Mass Barrier',
  spellId: massBarrier.spellId + 1,
  dr: prismaticBarrier.dr,
  drType: prismaticBarrier.drType,
  associatedSpec: { class: 'Mage', spec: 'Arcane' },
  iconName: 'spell_holy_magicalsentry',
}

export const improvedArcaneMassBarrier: Ability = {
  name: 'Improved Prismatic Barrier',
  spellId: improvedPrismaticBarrier.spellId + 1,
  associatedSpec: { class: 'Mage', spec: 'Arcane' },
  iconName: 'spell_magearmor',
  abilityAugmentations: [
    {
      ...improvedPrismaticBarrierAugmentation,
      otherSpellId: arcaneMassBarrier.spellId,
    },
  ],
}

export const rallyingCry: Ability = {
  name: 'Rallying Cry',
  spellId: 97462,
  healthIncrease: 0.1,
  associatedClass: 'Warrior',
  iconName: 'ability_warrior_rallyingcry',
  wowheadLink: 'https://www.wowhead.com/spell=97462/rallying-cry',
}

export const auraMastery: Ability = {
  name: 'Aura Mastery',
  spellId: 31821,
  dr: 0.09,
  associatedSpec: { class: 'Paladin', spec: 'Holy' },
  iconName: 'spell_holy_auramastery',
  wowheadLink: 'https://www.wowhead.com/spell=31821/aura-mastery',
  notes: 'Assumes you already have 3% devo aura selected',
}

export const powerWordBarrier: Ability = {
  name: 'Power Word: Barrier',
  spellId: 62618,
  dr: 0.2,
  associatedSpec: { class: 'Priest', spec: 'Discipline' },
  iconName: 'spell_holy_powerwordbarrier',
  wowheadLink: 'https://www.wowhead.com/spell=62618/power-word-barrier',
}

export const antiMagicZone: Ability = {
  name: 'Anti-Magic Zone',
  spellId: 51052,
  dr: 0.2,
  drType: 'magic',
  associatedClass: 'Death Knight',
  iconName: 'spell_deathknight_antimagiczone',
  wowheadLink: 'https://www.wowhead.com/spell=51052/anti-magic-zone',
}

export const stoneskinTotem: Ability = {
  name: 'Stoneskin Totem',
  spellId: 383017,
  dr: 0.1,
  drType: 'physical',
  associatedClass: 'Shaman',
  iconName: 'ability_shaman_stoneskintotem',
  wowheadLink: 'https://www.wowhead.com/spell=383017/stoneskin-totem',
}

export const spiritLinkTotem: Ability = {
  name: 'Spirit Link Totem',
  spellId: 98008,
  dr: 0.1,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  iconName: 'spell_shaman_spiritlink',
}

export const groupActives: Ability[] = [
  zephyr,
  chiCocoon,
  massBarrier,
  arcaneMassBarrier,
  improvedArcaneMassBarrier,
  rallyingCry,
  auraMastery,
  spiritLinkTotem,
  powerWordBarrier,
  antiMagicZone,
  stoneskinTotem,
]
