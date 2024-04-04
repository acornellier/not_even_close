import { Ability } from '../ability'

const defensiveStance: Ability = {
  name: 'Defensive Stance',
  dr: 0.15,
  spellId: 197690,
  iconName: 'ability_warrior_defensivestance',
}

const spellReflection: Ability = {
  name: 'Spell Reflection',
  dr: 0.2,
  drType: 'magic',
  spellId: 23920,
  iconName: 'ability_warrior_shieldreflection',
}

const enragedRegeneration: Ability = {
  name: 'Enraged Regeneration',
  dr: 0.3,
  spellId: 184364,
  iconName: 'ability_warrior_focusedrage',
}

const dieByTheSword: Ability = {
  name: 'Die by the Sword',
  dr: 0.3,
  spellId: 118038,
  iconName: 'ability_warrior_challange',
}

const warpaint: Ability = {
  name: 'Warpaint',
  dr: 0.1,
  spellId: 208154,
  iconName: 'ability_rogue_preparation',
  notes: 'Enrage is usually active, but not always',
}

const seasonedSoldier: Ability = {
  name: 'Seasoned Soldier',
  aoeDr: 0.1,
  spellId: 279423,
  onByDefault: true,
  iconName: 'inv_axe_09',
}

const ignorePain: Ability = {
  name: 'Ignore Pain',
  spellId: 190456,
  absorb: {
    apMultipler: 4.375,
    versAffected: true,
  },
  iconName: 'ability_warrior_renewedvigor',
  notes: 'This is slightly off due to weapon dps missing.',
}

export const warriorArmsAbilities = [
  seasonedSoldier,
  ignorePain,
  defensiveStance,
  spellReflection,
  dieByTheSword,
]

export const warriorFuryAbilities = [
  defensiveStance,
  warpaint,
  spellReflection,
  enragedRegeneration,
]
