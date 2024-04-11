import { havocAbilities } from './classAbilities/demonHunter'
import { Ability } from './ability'
import {
  evokerAugAbilities,
  evokerDevAbilities,
  evokerPresAbilities,
} from './classAbilities/evoker'
import { monkMistweaverAbilities, monkWindwalkerAbilities } from './classAbilities/monk'
import {
  mageArcaneAbilities,
  mageFireAbilities,
  mageFrostAbilities,
} from './classAbilities/mage'
import {
  shamanEleAbilities,
  shamanEnhAbilities,
  shamanRestoAbilities,
} from './classAbilities/shaman'
import {
  priestDiscAbilities,
  priestHolyAbilities,
  priestShadowAbilities,
} from './classAbilities/priest'
import { hunterBmAbilities, hunterMmSurvAbilities } from './classAbilities/hunter'
import { deathKnightAbilities } from './classAbilities/deathKnight'
import { warriorArmsAbilities, warriorFuryAbilities } from './classAbilities/warrior'
import { paladinHolyAbilities, paladinRetAbilities } from './classAbilities/paladin'
import { warlockAffDestroAbilities, warlockDemoAbilities } from './classAbilities/warlock'
import {
  druidBalanceAbilities,
  druidFeralAbilities,
  druidRestoAbilities,
} from './classAbilities/druid'
import {
  rogueAssAbilities,
  rogueOutlawAbilities,
  rogueSubAbilities,
} from './classAbilities/rogue'

export type WowClass =
  | 'Death Knight'
  | 'Demon Hunter'
  | 'Druid'
  | 'Evoker'
  | 'Hunter'
  | 'Mage'
  | 'Monk'
  | 'Paladin'
  | 'Priest'
  | 'Rogue'
  | 'Shaman'
  | 'Warlock'
  | 'Warrior'

export type ClassSpec = { class: WowClass; spec: WowSpec }

export const equalSpecs = (a: ClassSpec, b: ClassSpec) =>
  a.class === b.class && a.spec === b.spec

export type WowSpec = string

type SpecDetails = {
  abilities: Ability[]
  icon: string
}

export const classSpecs: Record<WowClass, Record<WowSpec, SpecDetails>> = {
  'Death Knight': {
    Frost: { abilities: deathKnightAbilities, icon: 'spell_deathknight_frostpresence' },
    Unholy: { abilities: deathKnightAbilities, icon: 'spell_deathknight_unholypresence' },
  },
  'Demon Hunter': {
    Havoc: { abilities: havocAbilities, icon: 'ability_demonhunter_specdps' },
  },
  Druid: {
    Balance: { abilities: druidBalanceAbilities, icon: 'spell_nature_starfall' },
    Feral: { abilities: druidFeralAbilities, icon: 'ability_druid_catform' },
    Restoration: { abilities: druidRestoAbilities, icon: 'spell_nature_healingtouch' },
  },
  Evoker: {
    Augmentation: {
      abilities: evokerAugAbilities,
      icon: 'classicon_evoker_augmentation',
    },
    Devastation: { abilities: evokerDevAbilities, icon: 'classicon_evoker_devastation' },
    Preservation: {
      abilities: evokerPresAbilities,
      icon: 'classicon_evoker_preservation',
    },
  },
  Hunter: {
    'Beast Mastery': {
      abilities: hunterBmAbilities,
      icon: 'ability_hunter_bestialdiscipline',
    },
    Marksmanship: { abilities: hunterMmSurvAbilities, icon: 'ability_hunter_focusedaim' },
    Survival: { abilities: hunterMmSurvAbilities, icon: 'ability_hunter_camouflage' },
  },
  Mage: {
    Arcane: { abilities: mageArcaneAbilities, icon: 'spell_holy_magicalsentry' },
    Fire: { abilities: mageFireAbilities, icon: 'spell_fire_firebolt02' },
    Frost: { abilities: mageFrostAbilities, icon: 'spell_frost_frostbolt02' },
  },
  Monk: {
    Mistweaver: {
      abilities: monkMistweaverAbilities,
      icon: 'spell_monk_mistweaver_spec',
    },
    Windwalker: {
      abilities: monkWindwalkerAbilities,
      icon: 'spell_monk_windwalker_spec',
    },
  },
  Paladin: {
    Holy: { abilities: paladinHolyAbilities, icon: 'spell_holy_holybolt' },
    Retribution: { abilities: paladinRetAbilities, icon: 'spell_holy_auraoflight' },
  },
  Priest: {
    Discipline: { abilities: priestDiscAbilities, icon: 'spell_holy_powerwordshield' },
    Holy: { abilities: priestHolyAbilities, icon: 'spell_holy_guardianspirit' },
    Shadow: { abilities: priestShadowAbilities, icon: 'spell_shadow_shadowwordpain' },
  },
  Rogue: {
    Assassination: { abilities: rogueAssAbilities, icon: 'ability_rogue_eviscerate' },
    Outlaw: { abilities: rogueOutlawAbilities, icon: 'ability_rogue_waylay' },
    Subtlety: { abilities: rogueSubAbilities, icon: 'ability_stealth' },
  },
  Shaman: {
    Enhancement: {
      abilities: shamanEnhAbilities,
      icon: 'spell_shaman_improvedstormstrike',
    },
    Elemental: {
      abilities: shamanEleAbilities,
      icon: 'spell_nature_lightning',
    },
    Restoration: { abilities: shamanRestoAbilities, icon: 'spell_nature_magicimmunity' },
  },
  Warlock: {
    Affliction: { abilities: warlockAffDestroAbilities, icon: 'spell_shadow_deathcoil' },
    Demonology: { abilities: warlockDemoAbilities, icon: 'spell_shadow_metamorphosis' },
    Destruction: {
      abilities: warlockAffDestroAbilities,
      icon: 'spell_shadow_rainoffire',
    },
  },
  Warrior: {
    Arms: { abilities: warriorArmsAbilities, icon: 'ability_warrior_savageblow' },
    Fury: { abilities: warriorFuryAbilities, icon: 'ability_warrior_innerrage' },
  },
} as const

export const defaultAbilities = (classSpec: ClassSpec) =>
  classSpecs[classSpec.class][classSpec.spec]!.abilities.filter(
    ({ onByDefault }) => onByDefault
  )

export const classColors: Record<WowClass, string> = {
  'Death Knight': '#C41E3A',
  'Demon Hunter': '#A330C9',
  Druid: '#FF7C0A',
  Evoker: '#33937F',
  Hunter: '#AAD372',
  Mage: '#3FC7EB',
  Monk: '#00FF98',
  Paladin: '#F48CBA',
  Priest: '#FFFFFF',
  Rogue: '#FFF468',
  Shaman: '#0070DD',
  Warlock: '#8788EE',
  Warrior: '#C69B6D',
}
