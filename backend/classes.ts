import { havocAbilities } from './classAbilities/demonHunter'
import { Ability } from './ability'
import {
  evokerDevAbilities,
  evokerAugAbilities,
  evokerPresAbilities,
} from './classAbilities/evoker'
import { monkMistweaverAbilities, monkWindwalkerAbilities } from './classAbilities/monk'
import {
  mageArcaneAbilities,
  mageFireAbilities,
  mageFrostAbilities,
} from './classAbilities/mage'
import {
  shamanEnhAbilities,
  shamanEleAbilities,
  shamanRestoAbilities,
} from './classAbilities/shaman'
import {
  priestDiscAbilities,
  priestHolyAbilities,
  priestShadowAbilities,
} from './classAbilities/priest'
import { hunterAbilities } from './classAbilities/hunter'
import { deathKnightAbilities } from './classAbilities/deathKnight'
import { warriorArmsAbilities, warriorFuryAbilities } from './classAbilities/warrior'
import { paladinHolyAbilities, paladinRetAbilities } from './classAbilities/paladin'
import { warlockAbilities } from './classAbilities/warlock'
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

export const classSpecAbilities = {
  'Death Knight': {
    Frost: deathKnightAbilities,
    Unholy: deathKnightAbilities,
  },
  'Demon Hunter': {
    Havoc: havocAbilities,
  },
  Druid: {
    Balance: druidBalanceAbilities,
    Feral: druidFeralAbilities,
    Restoration: druidRestoAbilities,
  },
  Evoker: {
    Augmentation: evokerAugAbilities,
    Devastation: evokerDevAbilities,
    Preservation: evokerPresAbilities,
  },
  Hunter: {
    'Beast Mastery': hunterAbilities,
    Marksmanship: hunterAbilities,
    Survival: hunterAbilities,
  },
  Mage: {
    Arcane: mageArcaneAbilities,
    Fire: mageFireAbilities,
    Frost: mageFrostAbilities,
  },
  Monk: {
    Mistweaver: monkMistweaverAbilities,
    Windwalker: monkWindwalkerAbilities,
  },
  Paladin: {
    Holy: paladinHolyAbilities,
    Retribution: paladinRetAbilities,
  },
  Priest: {
    Discipline: priestDiscAbilities,
    Holy: priestHolyAbilities,
    Shadow: priestShadowAbilities,
  },
  Rogue: {
    Assassination: rogueAssAbilities,
    Outlaw: rogueOutlawAbilities,
    Subtlety: rogueSubAbilities,
  },
  Shaman: {
    Enhancement: shamanEnhAbilities,
    Elemental: shamanEleAbilities,
    Restoration: shamanRestoAbilities,
  },
  Warlock: {
    Affliction: warlockAbilities,
    Demonology: warlockAbilities,
    Destruction: warlockAbilities,
  },
  Warrior: {
    Arms: warriorArmsAbilities,
    Fury: warriorFuryAbilities,
  },
} as const

export type WowClass = keyof typeof classSpecAbilities
export type WowSpec = string
export type WowClassSpec = { class: WowClass; spec: WowSpec }
