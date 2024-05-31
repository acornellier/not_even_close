import type { Ability } from '../ability'

const defensiveStance: Ability = {
  name: 'Defensive Stance',
  dr: 0.15,
  spellId: 197690,
  icon: 'ability_warrior_defensivestance',
}

const defensiveStanceProt: Ability = {
  ...defensiveStance,
  dr: 0.2,
}

const spellReflection: Ability = {
  name: 'Spell Reflection',
  dr: 0.2,
  drType: 'magic',
  spellId: 23920,
  icon: 'ability_warrior_shieldreflection',
}

const enragedRegeneration: Ability = {
  name: 'Enraged Regeneration',
  dr: 0.3,
  spellId: 184364,
  icon: 'ability_warrior_focusedrage',
}

const dieByTheSword: Ability = {
  name: 'Die by the Sword',
  dr: 0.3,
  spellId: 118038,
  icon: 'ability_warrior_challange',
}

const warpaint: Ability = {
  name: 'Warpaint',
  dr: 0.1,
  spellId: 208154,
  icon: 'ability_rogue_preparation',
  notes: 'Enrage is usually active, but not always',
}

const seasonedSoldier: Ability = {
  name: 'Seasoned Soldier',
  aoeDr: 0.1,
  spellId: 279423,
  onByDefault: true,
  icon: 'inv_axe_09',
}

const ignorePain: Ability = {
  name: 'Ignore Pain',
  spellId: 190456,
  absorb: {
    apMultipler: 4.375,
    versAffected: true,
  },
  stacks: {
    type: 'stacks',
    default: 1,
    max: 10,
  },
  icon: 'ability_warrior_renewedvigor',
  notes: 'This is slightly off due to weapon dps missing.',
}

const punish: Ability = {
  name: 'Punish',
  spellId: 275334,
  damageDealtReduction: 0.03,
  stacks: {
    type: 'stacks',
    default: 1,
    max: 10,
  },
  icon: 'ability_deathknight_sanguinfortitude',
}

const shieldWall: Ability = {
  name: 'Shield Wall',
  spellId: 871,
  dr: 0.4,
  icon: 'ability_warrior_shieldwall',
}

const lastStand: Ability = {
  name: 'Shield Wall',
  spellId: 12975,
  healthIncrease: 0.3,
  icon: 'spell_holy_ashestoashes',
}

const demoralizingShout: Ability = {
  name: 'Demoralizing Shout',
  spellId: 1160,
  dr: 0.2,
  icon: 'ability_warrior_warcry',
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

export const warriorProtAbilities = [
  punish,
  ignorePain,
  defensiveStanceProt,
  spellReflection,
  lastStand,
  demoralizingShout,
  shieldWall,
]
