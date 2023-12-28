import { Ability } from '../ability'

export const obduracy: Ability = {
  name: 'Obduracy',
  aoeDr: 0.02,
  onByDefault: true,
  spellId: 385427,
  iconName: 'ability_paladin_speedoflight',
}

export const sanctifiedPlates: Ability = {
  name: 'Sanctified Plates',
  aoeDr: 0.05,
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

export const divineProtectionHoly: Ability = {
  name: 'Divine Protection',
  dr: 0.2,
  spellId: 498,
  iconName: 'spell_holy_divineprotection',
}

export const divineProtectionRet: Ability = {
  ...divineProtectionHoly,
  dr: 0.3,
}

export const shieldOfVengeance: Ability = {
  name: 'Divine Protection',
  absorbHealthMultiplier: 0.4,
  spellId: 184662,
  iconName: 'ability_paladin_shieldofthetemplar',
  notes: 'Assumes you have Aegis of Protection',
}

export const paladinHolyAbilities = [
  obduracy,
  sanctifiedPlates,
  blessingOfDusk,
  divineProtectionHoly,
]

export const paladinRetAbilities = [
  obduracy,
  sanctifiedPlates,
  divineProtectionRet,
  shieldOfVengeance,
]
