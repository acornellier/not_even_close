import type { Ability } from '../ability'

const obduracy: Ability = {
  name: 'Obduracy',
  aoeDr: 0.02,
  onByDefault: true,
  id: 385427,
  passive: true,
  icon: 'ability_paladin_speedoflight',
  stacks: {
    type: 'talent',
    max: 2,
  },
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

const divineProtection: Ability = {
  name: 'Divine Protection',
  dr: 0.2,
  id: 498,
  icon: 'spell_holy_divineprotection',
}

const shieldOfVengeance: Ability = {
  name: 'Shield of Vengeance',
  id: 184662,
  icon: 'ability_paladin_shieldofthetemplar',
  passive: true,
  abilityAugmentations: [
    {
      otherAbilityId: divineProtection.id,
      field: 'dr',
      value: 0.1,
    },
    {
      otherAbilityId: divineProtection.id,
      field: 'absorb',
      absorbField: 'healthMultiplier',
      value: 0.3,
    },
  ],
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
  notes: '224% strength as armor',
}

const empyrealWard: Ability = {
  name: 'Empyreal Ward',
  id: 387791,
  icon: 'spell_holy_layonhands',
  armorIncrease: 0.3,
}

export const paladinHolyAbilities = [sanctifiedPlatesHoly, obduracy, divineProtection]

export const paladinRetAbilities = [
  sanctifiedPlatesRetProt,
  obduracy,
  wrathfulDescent,
  sacrosanctCrusadeRet,
  shieldOfVengeance,
  divineProtection,
]

export const paladinProtAbilities = [
  sanctifiedPlatesRetProt,
  obduracy,
  shieldOfTheRighteous,
  improvedArdentDefender,
  wrathfulDescent,
  sacrosanctCrusadeProt,
  ardentDefender,
  guardianOfAncientKings,
  sentinel,
  empyrealWard,
]
