import type { Ability } from '../ability'

const obduracy: Ability = {
  name: 'Obduracy',
  aoeDr: 0.02,
  onByDefault: true,
  id: 385427,
  icon: 'ability_paladin_speedoflight',
}

const sanctifiedPlatesRetProt: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.1,
  onByDefault: true,
  id: 402964,
  icon: 'inv_chest_plate_raidpaladin_s_01',
}

const sanctifiedPlatesHoly: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.06,
  onByDefault: true,
  id: 402964_1,
  icon: 'inv_chest_plate_raidpaladin_s_01',
}

const blessingOfDusk: Ability = {
  name: 'Blessing of Dusk',
  dr: 0.05,
  onByDefault: true,
  id: 385126,
  icon: 'achievement_zone_newshadowmoonvalley',
  notes: 'Blessing of Dusk is usually active, but not always',
}

const divineProtection: Ability = {
  name: 'Divine Protection',
  dr: 0.2,
  id: 498,
  icon: 'spell_holy_divineprotection',
}

const shieldOfVengeance: Ability = {
  name: 'Shield of Vengeance',
  absorb: {
    healthMultiplier: 0.3,
    versAffected: true,
  },
  id: 184662,
  icon: 'ability_paladin_shieldofthetemplar',
}

const sacrosanctCrusade: Ability = {
  name: 'Sacrosanct Crusade',
  id: 431731,
  icon: 'inv_plate_raidpaladinprimalist_d_01_cape',
  absorb: {
    healthMultiplier: shieldOfVengeance.absorb!.healthMultiplier! * 0.1,
    versAffected: true,
  },
}

const aegisOfProtection: Ability = {
  name: 'Aegis of Protection',
  id: 403654,
  onByDefault: true,
  icon: 'spell_holy_holyprotection',
  notes: 'Bugged. Increases Shield of Vengeance by 20% instead of 10%.',
  abilityAugmentations: [
    {
      otherAbilityId: divineProtection.id,
      field: 'dr',
      value: 0.1,
    },
    {
      otherAbilityId: shieldOfVengeance.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.2,
    },
  ],
}

const sentinel: Ability = {
  name: 'Sentinel',
  id: 389539,
  icon: 'spell_holy_holynova',
  dr: 0.02,
  healthIncrease: 0.01,
  stacks: {
    type: 'stacks',
    max: 15,
  },
}

const ardentDefender: Ability = {
  name: 'Ardent Defender',
  id: 31850,
  icon: 'spell_holy_ardentdefender',
  dr: 0.2,
}

const improvedArdentDefender: Ability = {
  name: 'Improved Ardent Defender',
  id: 393114,
  icon: 'spell_holy_ardentdefender',
  abilityAugmentations: [
    {
      otherAbilityId: ardentDefender.id,
      field: 'dr',
      value: 0.1,
    },
  ],
}

const guardianOfAncientKings: Ability = {
  name: 'Guardian of Ancient Kings',
  id: 212641,
  icon: 'spell_holy_heroism',
  dr: 0.5,
}

const eyeOfTyr: Ability = {
  name: 'Eye of Tyr',
  id: 387174,
  icon: 'inv_shield_1h_artifactnorgannon_d_01',
  damageDealtReduction: 0.25,
}

const allyOfTheLight: Ability = {
  name: 'Ally of the Light',
  id: 394714,
  icon: 'inv_lightforgedmatrixability_lightsjudgment',
  versIncrease: 0.08,
}

const redoubt: Ability = {
  name: 'Redoubt',
  id: 280375,
  icon: 'ability_warrior_shieldguard',
  onByDefault: true,
  staminaIncrease: 0.02,
  stacks: {
    type: 'stacks',
    max: 3,
  },
}

const divineBulwark: Ability = {
  name: 'Mastery: Divine Bulwark',
  id: 76671,
  icon: 'spell_holy_holyprotection',
  onByDefault: true,
  dr: 0.05,
  notes: 'Should scale off mastery but not implemented yet',
}

const sanctuary: Ability = {
  name: 'Sanctuary',
  id: 379021,
  icon: 'spell_holy_innerfire',
  onByDefault: true,
  abilityAugmentations: [
    {
      otherAbilityId: divineBulwark.id,
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
  sacrosanctCrusade,
  shieldOfVengeance,
  divineProtection,
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
