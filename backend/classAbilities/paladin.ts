import { Ability } from '../ability'

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

export const paladinHolyAbilities = [
  obduracy,
  sanctifiedPlatesHoly,
  blessingOfDusk,
  divineProtection,
]

export const paladinRetAbilities = [
  obduracy,
  sanctifiedPlatesRetProt,
  aegisOfProtection,
  blessingOfDusk,
  divineProtection,
  shieldOfVengeance,
]
