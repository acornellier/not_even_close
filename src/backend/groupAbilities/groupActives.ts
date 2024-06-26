﻿import type { Ability } from '../ability'
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
  icon: 'ability_evoker_hoverblack',
}

export const chiCocoon: Ability = {
  name: 'Chi Cocoon',
  spellId: 406220,
  associatedSpec: { class: 'Monk', spec: 'Mistweaver' },
  absorb: {
    healthMultiplier: 0.16,
    versAffected: true,
    backup: 270_000,
  },
  icon: 'inv_pet_crane',
  notes: 'Assumes 270K absorb if you have no mistweaver selected',
}

export const massBarrier: Ability = {
  name: 'Mass Barrier',
  spellId: 414660,
  associatedClass: 'Mage',
  absorb: {
    healthMultiplier: 0.2,
    versAffected: true,
    backup: 300_000,
  },
  icon: 'ability_racial_magicalresistance',
  notes: 'Assumes 300K absorb if you have no mage selected',
}

export const arcaneMassBarrier: Ability = {
  ...massBarrier,
  name: 'Arcane Mass Barrier',
  spellId: massBarrier.spellId + 1,
  dr: prismaticBarrier.dr,
  drType: prismaticBarrier.drType,
  associatedSpec: { class: 'Mage', spec: 'Arcane' },
  icon: 'spell_holy_magicalsentry',
}

export const improvedArcaneMassBarrier: Ability = {
  name: 'Improved Prismatic Barrier',
  spellId: improvedPrismaticBarrier.spellId + 1,
  associatedSpec: { class: 'Mage', spec: 'Arcane' },
  icon: 'spell_magearmor',
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
  icon: 'ability_warrior_rallyingcry',
}

export const auraMastery: Ability = {
  name: 'Aura Mastery',
  spellId: 31821,
  dr: 0.09,
  associatedSpec: { class: 'Paladin', spec: 'Holy' },
  icon: 'spell_holy_auramastery',
  notes: 'Assumes you already have 3% devo aura selected',
}

export const powerWordBarrier: Ability = {
  name: 'Power Word: Barrier',
  spellId: 62618,
  dr: 0.2,
  associatedSpec: { class: 'Priest', spec: 'Discipline' },
  icon: 'spell_holy_powerwordbarrier',
}

export const antiMagicZone: Ability = {
  name: 'Anti-Magic Zone',
  spellId: 51052,
  dr: 0.2,
  drType: 'magic',
  associatedClass: 'Death Knight',
  icon: 'spell_deathknight_antimagiczone',
}

export const stoneskinTotem: Ability = {
  name: 'Stoneskin Totem',
  spellId: 383017,
  dr: 0.1,
  drType: 'physical',
  associatedClass: 'Shaman',
  icon: 'ability_shaman_stoneskintotem',
}

export const spiritLinkTotem: Ability = {
  name: 'Spirit Link Totem',
  spellId: 98008,
  dr: 0.1,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  icon: 'spell_shaman_spiritlink',
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
