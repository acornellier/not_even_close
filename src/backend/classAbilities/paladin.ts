import type { Ability } from '../ability'

const obduracy: Ability = {
  name: 'Obduracy',
  aoeDr: 0.02,
  onByDefault: true,
  spellId: 385427,
  iconName: 'ability_paladin_speedoflight',
}

const sanctifiedPlatesRetProt: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.1,
  onByDefault: true,
  spellId: 402964,
  iconName: 'inv_chest_plate_raidpaladin_s_01',
}

const sanctifiedPlatesHoly: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.06,
  onByDefault: true,
  spellId: 402964,
  iconName: 'inv_chest_plate_raidpaladin_s_01',
}

const blessingOfDusk: Ability = {
  name: 'Blessing of Dusk',
  dr: 0.05,
  onByDefault: true,
  spellId: 385126,
  iconName: 'achievement_zone_newshadowmoonvalley',
  notes: 'Blessing of Dusk is usually active, but not always',
}

const divineProtection: Ability = {
  name: 'Divine Protection',
  dr: 0.2,
  spellId: 498,
  iconName: 'spell_holy_divineprotection',
}

const shieldOfVengeance: Ability = {
  name: 'Shield of Vengeance',
  absorb: {
    healthMultiplier: 0.3,
    versAffected: true,
  },
  spellId: 184662,
  iconName: 'ability_paladin_shieldofthetemplar',
}

const aegisOfProtection: Ability = {
  name: 'Aegis of Protection',
  spellId: 403654,
  onByDefault: true,
  iconName: 'spell_holy_holyprotection',
  notes: 'Bugged. Increases Shield of Vengeance by 20% instead of 10%.',
  abilityAugmentations: [
    {
      otherSpellId: divineProtection.spellId,
      field: 'dr',
      value: 0.1,
    },
    {
      otherSpellId: shieldOfVengeance.spellId,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.2,
    },
  ],
}

const sentinel: Ability = {
  name: 'Sentinel',
  spellId: 389539,
  iconName: 'spell_holy_holynova',
  dr: 0.02,
  healthIncrease: 0.01,
  stacks: {
    type: 'stacks',
    max: 15,
  },
}

const ardentDefender: Ability = {
  name: 'Ardent Defender',
  spellId: 31850,
  iconName: 'spell_holy_ardentdefender',
  dr: 0.2,
}

const improvedArdentDefender: Ability = {
  name: 'Improved Ardent Defender',
  spellId: 393114,
  iconName: 'spell_holy_ardentdefender',
  abilityAugmentations: [
    {
      otherSpellId: ardentDefender.spellId,
      field: 'dr',
      value: 0.1,
    },
  ],
}

const guardianOfAncientKings: Ability = {
  name: 'Guardian of Ancient Kings',
  spellId: 212641,
  iconName: 'spell_holy_heroism',
  dr: 0.5,
}

const eyeOfTyr: Ability = {
  name: 'Eye of Tyr',
  spellId: 387174,
  iconName: 'inv_shield_1h_artifactnorgannon_d_01',
  damageDealtReduction: 0.25,
}

const allyOfTheLight: Ability = {
  name: 'Ally of the Light',
  spellId: 394714,
  iconName: 'inv_lightforgedmatrixability_lightsjudgment',
  versIncrease: 0.08,
}

const redoubt: Ability = {
  name: 'Redoubt',
  spellId: 280375,
  iconName: 'ability_warrior_shieldguard',
  onByDefault: true,
  staminaIncrease: 0.02,
  stacks: {
    type: 'stacks',
    max: 3,
  },
}

const divineBulwark: Ability = {
  name: 'Mastery: Divine Bulwark',
  spellId: 76671,
  iconName: 'spell_holy_holyprotection',
  onByDefault: true,
  dr: 0.05,
  notes: 'Should scale off mastery but not implemented yet',
}

const sanctuary: Ability = {
  name: 'Sanctuary',
  spellId: 379021,
  iconName: 'spell_holy_innerfire',
  onByDefault: true,
  abilityAugmentations: [
    {
      otherSpellId: divineBulwark.spellId,
      field: 'dr',
      value: 0.05,
    },
  ],
}

export const paladinHolyAbilities = [
  sanctifiedPlatesHoly,
  obduracy,
  blessingOfDusk,
  divineProtection,
]

export const paladinRetAbilities = [
  sanctifiedPlatesRetProt,
  aegisOfProtection,
  obduracy,
  blessingOfDusk,
  divineProtection,
  shieldOfVengeance,
]

export const paladinProtAbilities = [
  sanctifiedPlatesRetProt,
  obduracy,
  blessingOfDusk,
  sanctuary,
  divineBulwark,
  redoubt,
  allyOfTheLight,
  improvedArdentDefender,
  ardentDefender,
  guardianOfAncientKings,
  sentinel,
  eyeOfTyr,
]
