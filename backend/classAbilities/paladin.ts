import { Ability } from '../ability'

export const obduracy: Ability = {
  name: 'Obduracy',
  aoeDr: 0.02,
  onByDefault: true,
  spellId: 385427,
  iconName: 'ability_paladin_speedoflight',
}

export const sanctifiedPlatesRetProt: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.1,
  onByDefault: true,
  spellId: 402964,
  iconName: 'inv_chest_plate_raidpaladin_s_01',
}

export const sanctifiedPlatesHoly: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.06,
  onByDefault: true,
  spellId: 402964,
  iconName: 'inv_chest_plate_raidpaladin_s_01',
}

export const blessingOfDusk: Ability = {
  name: 'Blessing of Dusk',
  dr: 0.05,
  onByDefault: true,
  spellId: 385126,
  iconName: 'achievement_zone_newshadowmoonvalley',
  notes: 'Blessing of Dusk is usually active, but not always',
}

export const divineProtection: Ability = {
  name: 'Divine Protection',
  dr: 0.2,
  spellId: 498,
  iconName: 'spell_holy_divineprotection',
}

export const shieldOfVengeance: Ability = {
  name: 'Shield of Vengeance',
  absorbHealthMultiplier: 0.3,
  absorbVersAffected: true,
  spellId: 184662,
  iconName: 'ability_paladin_shieldofthetemplar',
}

export const aegisOfProtection: Ability = {
  name: 'Aegis of Protection',
  spellId: 403654,
  onByDefault: true,
  iconName: 'spell_holy_holyprotection',
  abilityAugmentations: [
    {
      otherSpellId: 498, // Divine Protection
      field: 'dr',
      value: 0.1,
    },
    {
      otherSpellId: 184662, // Shield of Vengeance
      field: 'absorbHealthMultiplier',
      value: 0.1,
    },
  ],
}

export const paladinHolyAbilities = [
  obduracy,
  sanctifiedPlatesHoly,
  blessingOfDusk,
  divineProtection,
]

export const paladinRetAbilities = [
  obduracy,
  sanctifiedPlatesRetProt,
  divineProtection,
  shieldOfVengeance,
  aegisOfProtection,
]
