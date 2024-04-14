import { Ability } from '../ability'

const defensiveStance: Ability = {
  name: 'Defensive Stance',
  dr: 0.15,
  id: 197690,
  icon: 'ability_warrior_defensivestance',
}

const spellReflection: Ability = {
  name: 'Spell Reflection',
  dr: 0.2,
  drType: 'magic',
  id: 23920,
  icon: 'ability_warrior_shieldreflection',
}

const enragedRegeneration: Ability = {
  name: 'Enraged Regeneration',
  dr: 0.3,
  id: 184364,
  icon: 'ability_warrior_focusedrage',
}

const dieByTheSword: Ability = {
  name: 'Die by the Sword',
  dr: 0.3,
  id: 118038,
  icon: 'ability_warrior_challange',
}

const warpaint: Ability = {
  name: 'Warpaint',
  dr: 0.1,
  id: 208154,
  icon: 'ability_rogue_preparation',
  notes: 'Enrage is usually active, but not always',
}

const seasonedSoldier: Ability = {
  name: 'Seasoned Soldier',
  aoeDr: 0.1,
  id: 279423,
  onByDefault: true,
  icon: 'inv_axe_09',
}

const ignorePain: Ability = {
  name: 'Ignore Pain',
  id: 190456,
  absorb: {
    apMultipler: 4.375,
    versAffected: true,
  },
  icon: 'ability_warrior_renewedvigor',
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
