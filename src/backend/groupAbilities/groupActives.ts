import type { Ability } from '../ability'
import { prismaticBarrier } from '../classAbilities/mage.ts'

const zephyr: Ability = {
  name: 'Zephyr',
  id: 374227,
  aoeDr: 0.2,
  associatedClass: 'Evoker',
  icon: 'ability_evoker_hoverblack',
}

const chiCocoon: Ability = {
  name: 'Chi Cocoon',
  id: 406220,
  associatedSpec: { class: 'Monk', spec: 'Mistweaver' },
  absorb: {
    healthMultiplier: 0.12,
    versAffected: true,
    backup: 800_000,
  },
  icon: 'inv_pet_crane',
  notes: 'Assumes {{backup}} absorb if you have no mistweaver selected',
}

const jadeBond: Ability = {
  name: 'Jade Bond',
  id: 388031,
  icon: 'inv_inscription_deck_jadeserpent',
  abilityAugmentations: [
    {
      otherAbilityId: chiCocoon.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 1,
    },
  ],
}

const massBarrier: Ability = {
  name: 'Mass Barrier',
  id: 414660,
  associatedClass: 'Mage',
  absorb: {
    healthMultiplier: 0.2,
    versAffected: true,
    backup: 900_000,
  },
  icon: 'ability_racial_magicalresistance',
  notes: 'Assumes {{backup}} absorb if you have no mage selected',
}

const arcaneMassBarrier: Ability = {
  id: massBarrier.id + 1,
  name: 'Prismatic Barrier',
  icon: prismaticBarrier.icon,
  abilityAugmentations: [
    {
      otherAbilityId: massBarrier.id,
      field: 'dr',
      value: 0.25,
    },
  ],
}

const rallyingCry: Ability = {
  name: 'Rallying Cry',
  id: 97462,
  healthIncrease: 0.1,
  associatedClass: 'Warrior',
  icon: 'ability_warrior_rallyingcry',
}

const lightsProtection: Ability = {
  name: "Light's Protection",
  id: 461243,
  dr: 0.05,
  associatedSpec: { class: 'Paladin', spec: 'Holy' },
  icon: 'spell_holy_absolution',
}

const auraMastery: Ability = {
  name: 'Aura Mastery',
  id: 31821,
  dr: 0.09,
  associatedSpec: { class: 'Paladin', spec: 'Holy' },
  icon: 'spell_holy_auramastery',
  notes: 'Assumes you already have 3% devo aura selected',
}

const powerWordBarrier: Ability = {
  name: 'Power Word: Barrier',
  id: 62618,
  dr: 0.2,
  associatedSpec: { class: 'Priest', spec: 'Discipline' },
  icon: 'spell_holy_powerwordbarrier',
}

const antiMagicZone: Ability = {
  name: 'Anti-Magic Zone',
  id: 51052,
  dr: 0.2,
  drType: 'magic',
  associatedClass: 'Death Knight',
  icon: 'spell_deathknight_antimagiczone',
}

const spiritLinkTotem: Ability = {
  name: 'Spirit Link Totem',
  id: 98008,
  dr: 0.1,
  associatedSpec: { class: 'Shaman', spec: 'Restoration' },
  icon: 'spell_shaman_spiritlink',
}

const downpour: Ability = {
  name: 'Downpour',
  id: 207778,
  icon: 'ability_mage_waterjet',
  healthIncrease: 0.1,
}

const spoutingSpirits: Ability = {
  name: 'Spouting Spirits',
  id: 288384,
  icon: 'spell_shaman_spiritlink',
  abilityAugmentations: [
    {
      otherAbilityId: spiritLinkTotem.id,
      field: 'dr',
      value: 0.05,
    },
  ],
}

const elementalResistance: Ability = {
  name: 'Elemental Resistance',
  id: 462369,
  icon: 'spell_fireresistancetotem_01',
  dr: 0.06,
  drType: 'magic',
}

export const groupActives: Ability[] = [
  zephyr,
  chiCocoon,
  jadeBond,
  massBarrier,
  // arcaneMassBarrier,
  rallyingCry,
  lightsProtection,
  auraMastery,
  spoutingSpirits,
  powerWordBarrier,
  antiMagicZone,
  // elementalResistance,
  downpour,
  spiritLinkTotem,
]
