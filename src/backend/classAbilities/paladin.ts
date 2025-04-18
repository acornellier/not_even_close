import type { Ability } from '../ability'

const obduracy: Ability = {
  name: 'Obduracy',
  aoeDr: 0.02,
  onByDefault: true,
  id: 385427,
  passive: true,
  icon: 'ability_paladin_speedoflight',
}

const sanctifiedPlatesRetProt: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.06,
  onByDefault: true,
  id: 402964,
  icon: 'inv_chest_plate_raidpaladin_s_01',
}

const sanctifiedPlatesHoly: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.03,
  onByDefault: true,
  id: 402964_1,
  spellId: 402964,
  passive: true,
  icon: 'inv_chest_plate_raidpaladin_s_01',
}

const blessingOfDusk: Ability = {
  name: 'Blessing of Dusk',
  dr: 0.04,
  onByDefault: true,
  id: 409439,
  passive: true,
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

const sacrosanctCrusadeProt: Ability = {
  name: 'Sacrosanct Crusade',
  id: 431731_1,
  icon: 'inv_plate_raidpaladinprimalist_d_01_cape',
  absorb: {
    healthMultiplier: 0.15,
    versAffected: true,
  },
}

const sacrosanctCrusadeRet: Ability = {
  name: 'Sacrosanct Crusade',
  id: 431731_2,
  icon: 'inv_plate_raidpaladinprimalist_d_01_cape',
  absorb: {
    healthMultiplier: 0.1,
    versAffected: true,
  },
}

const aegisOfProtection: Ability = {
  name: 'Aegis of Protection',
  id: 403654,
  passive: true,
  icon: 'spell_holy_holyprotection',
  abilityAugmentations: [
    {
      otherAbilityId: divineProtection.id,
      field: 'dr',
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
  passive: true,
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

const redoubt: Ability = {
  name: 'Redoubt',
  id: 280375,
  passive: true,
  icon: 'ability_warrior_shieldguard',
  onByDefault: true,
  staminaIncrease: 0.02,
  stacks: {
    type: 'stacks',
    max: 3,
  },
}

export const divineBulwark: Ability = {
  name: 'Mastery: Divine Bulwark',
  id: 76671,
  passive: true,
  icon: 'spell_holy_holyprotection',
  onByDefault: true,
  notes: 'DR = 5% + 0.026 x mastery %',
}

const wrathfulDescent: Ability = {
  name: 'Wrathful Descent',
  id: 431551,
  icon: 'ability_paladin_intercession',
  damageDealtReduction: 0.05,
  notes: 'Unreliable uptime',
}

export const shieldOfTheRighteous: Ability = {
  name: 'Shield of the Righteous',
  id: 53600,
  icon: 'ability_paladin_shieldofvengeance',
  notes: '160% strength as armor',
}

const empyrealWard: Ability = {
  name: 'Empyreal Ward',
  id: 387791,
  icon: 'spell_holy_layonhands',
  armorIncrease: 0.3,
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
  wrathfulDescent,
  sacrosanctCrusadeRet,
  shieldOfVengeance,
  divineProtection,
]

export const paladinProtAbilities = [
  sanctifiedPlatesRetProt,
  obduracy,
  blessingOfDusk,
  divineBulwark,
  redoubt,
  shieldOfTheRighteous,
  improvedArdentDefender,
  wrathfulDescent,
  sacrosanctCrusadeProt,
  ardentDefender,
  guardianOfAncientKings,
  sentinel,
  eyeOfTyr,
  empyrealWard,
]
