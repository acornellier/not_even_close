import { Ability } from '../ability'

export const obduracy: Ability = {
  name: 'Obduracy',
  avoidance: 0.02,
  onByDefault: true,
  spellId: 385427,
  iconName: 'ability_paladin_speedoflight',
}

export const sanctifiedPlatesHoly: Ability = {
  name: 'Obduracy',
  staminaIncrease: 0.05,
  avoidance: 0.05,
  onByDefault: true,
  spellId: 402964,
  iconName: 'inv_chest_plate_raidpaladin_s_01',
}

export const sanctifiedPlatesRet: Ability = {
  name: 'Obduracy',
  staminaIncrease: 0.45,
  avoidance: 0.05,
  onByDefault: true,
  spellId: 402964,
  iconName: 'inv_chest_plate_raidpaladin_s_01',
}

export const divineProtectionHoly: Ability = {
  name: 'Divine Protection',
  dr: 0.2,
  spellId: 498,
  iconName: 'spell_holy_divineprotection',
}

export const divineProtectionRet: Ability = {
  name: 'Divine Protection',
  dr: 0.3,
  spellId: 498,
  iconName: 'spell_holy_divineprotection',
}

export const shieldOfVengeance: Ability = {
  name: 'Divine Protection',
  absorb: 450_000,
  spellId: 184662,
  iconName: 'ability_paladin_shieldofthetemplar',
  notes:
    "Assumes 450K absorb. In reality varies based on Paladin's HP and vers.",
}

export const paladinHolyAbilities = [
  obduracy,
  sanctifiedPlatesHoly,
  divineProtectionHoly,
]

export const paladinRetAbilities = [
  obduracy,
  sanctifiedPlatesRet,
  divineProtectionRet,
  shieldOfVengeance,
]
