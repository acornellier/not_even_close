﻿import { havocAbilities } from './classAbilities/demonHunter'
import type { Ability } from './ability'
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
import {
  deathKnightAbilities,
  deathKnightBloodAbilities,
} from './classAbilities/deathKnight'
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
  mainStat: 'intellect' | 'other'
  isTank?: boolean
}

export const classSpecs: Record<WowClass, Record<WowSpec, SpecDetails>> = {
  'Death Knight': {
    Blood: {
      abilities: deathKnightBloodAbilities,
      icon: 'spell_deathknight_bloodpresence',
      mainStat: 'other',
    },
    Frost: {
      abilities: deathKnightAbilities,
      icon: 'spell_deathknight_frostpresence',
      mainStat: 'other',
    },
    Unholy: {
      abilities: deathKnightAbilities,
      icon: 'spell_deathknight_unholypresence',
      mainStat: 'other',
    },
  },
  'Demon Hunter': {
    Havoc: {
      abilities: havocAbilities,
      icon: 'ability_demonhunter_specdps',
      mainStat: 'other',
    },
  },
  Druid: {
    Balance: {
      abilities: druidBalanceAbilities,
      icon: 'spell_nature_starfall',
      mainStat: 'intellect',
    },
    Feral: {
      abilities: druidFeralAbilities,
      icon: 'ability_druid_catform',
      mainStat: 'other',
    },
    Restoration: {
      abilities: druidRestoAbilities,
      icon: 'spell_nature_healingtouch',
      mainStat: 'intellect',
    },
  },
  Evoker: {
    Augmentation: {
      abilities: evokerAugAbilities,
      icon: 'classicon_evoker_augmentation',
      mainStat: 'intellect',
    },
    Devastation: {
      abilities: evokerDevAbilities,
      icon: 'classicon_evoker_devastation',
      mainStat: 'intellect',
    },
    Preservation: {
      abilities: evokerPresAbilities,
      icon: 'classicon_evoker_preservation',
      mainStat: 'intellect',
    },
  },
  Hunter: {
    'Beast Mastery': {
      abilities: hunterBmAbilities,
      icon: 'ability_hunter_bestialdiscipline',
      mainStat: 'other',
    },
    Marksmanship: {
      abilities: hunterMmSurvAbilities,
      icon: 'ability_hunter_focusedaim',
      mainStat: 'other',
    },
    Survival: {
      abilities: hunterMmSurvAbilities,
      icon: 'ability_hunter_camouflage',
      mainStat: 'other',
    },
  },
  Mage: {
    Arcane: {
      abilities: mageArcaneAbilities,
      icon: 'spell_holy_magicalsentry',
      mainStat: 'intellect',
    },
    Fire: {
      abilities: mageFireAbilities,
      icon: 'spell_fire_firebolt02',
      mainStat: 'intellect',
    },
    Frost: {
      abilities: mageFrostAbilities,
      icon: 'spell_frost_frostbolt02',
      mainStat: 'intellect',
    },
  },
  Monk: {
    Mistweaver: {
      abilities: monkMistweaverAbilities,
      icon: 'spell_monk_mistweaver_spec',
      mainStat: 'intellect',
    },
    Windwalker: {
      abilities: monkWindwalkerAbilities,
      icon: 'spell_monk_windwalker_spec',
      mainStat: 'other',
    },
  },
  Paladin: {
    Holy: {
      abilities: paladinHolyAbilities,
      icon: 'spell_holy_holybolt',
      mainStat: 'intellect',
    },
    Retribution: {
      abilities: paladinRetAbilities,
      icon: 'spell_holy_auraoflight',
      mainStat: 'other',
    },
  },
  Priest: {
    Discipline: {
      abilities: priestDiscAbilities,
      icon: 'spell_holy_powerwordshield',
      mainStat: 'intellect',
    },
    Holy: {
      abilities: priestHolyAbilities,
      icon: 'spell_holy_guardianspirit',
      mainStat: 'intellect',
    },
    Shadow: {
      abilities: priestShadowAbilities,
      icon: 'spell_shadow_shadowwordpain',
      mainStat: 'intellect',
    },
  },
  Rogue: {
    Assassination: {
      abilities: rogueAssAbilities,
      icon: 'ability_rogue_eviscerate',
      mainStat: 'other',
    },
    Outlaw: {
      abilities: rogueOutlawAbilities,
      icon: 'ability_rogue_waylay',
      mainStat: 'other',
    },
    Subtlety: {
      abilities: rogueSubAbilities,
      icon: 'ability_stealth',
      mainStat: 'other',
    },
  },
  Shaman: {
    Enhancement: {
      abilities: shamanEnhAbilities,
      icon: 'spell_shaman_improvedstormstrike',
      mainStat: 'other',
    },
    Elemental: {
      abilities: shamanEleAbilities,
      icon: 'spell_nature_lightning',
      mainStat: 'intellect',
    },
    Restoration: {
      abilities: shamanRestoAbilities,
      icon: 'spell_nature_magicimmunity',
      mainStat: 'intellect',
    },
  },
  Warlock: {
    Affliction: {
      abilities: warlockAffDestroAbilities,
      icon: 'spell_shadow_deathcoil',
      mainStat: 'intellect',
    },
    Demonology: {
      abilities: warlockDemoAbilities,
      icon: 'spell_shadow_metamorphosis',
      mainStat: 'intellect',
    },
    Destruction: {
      abilities: warlockAffDestroAbilities,
      icon: 'spell_shadow_rainoffire',
      mainStat: 'intellect',
    },
  },
  Warrior: {
    Arms: {
      abilities: warriorArmsAbilities,
      icon: 'ability_warrior_savageblow',
      mainStat: 'other',
    },
    Fury: {
      abilities: warriorFuryAbilities,
      icon: 'ability_warrior_innerrage',
      mainStat: 'other',
    },
  },
} as const

export const defaultAbilities = (classSpec: ClassSpec) =>
  classSpecs[classSpec.class][classSpec.spec]!.abilities.filter(
    ({ onByDefault }) => onByDefault,
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
