import type { Ability } from '../ability'

const defensiveStance: Ability = {
  name: 'Defensive Stance',
  dr: 0.15,
  id: 197690,
  icon: 'ability_warrior_defensivestance',
}

const defensiveStanceProt: Ability = {
  ...defensiveStance,
  dr: 0.16,
  id: defensiveStance.id + 1,
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
  aoeDr: 0.05,
  id: 279423,
  passive: true,
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
  id: 275334,
  damageDealtReduction: 0.02,
  stacks: {
    type: 'stacks',
    default: 1,
    max: 10,
  },
  icon: 'ability_deathknight_sanguinfortitude',
}

const shieldWall: Ability = {
  name: 'Shield Wall',
  id: 871,
  dr: 0.4,
  icon: 'ability_warrior_shieldwall',
}

const lastStand: Ability = {
  name: 'Shield Wall',
  id: 12975,
  healthIncrease: 0.3,
  icon: 'spell_holy_ashestoashes',
}

const demoralizingShout: Ability = {
  name: 'Demoralizing Shout',
  id: 1160,
  dr: 0.2,
  icon: 'ability_warrior_warcry',
}

const impendingVictory: Ability = {
  name: 'Impending Victory',
  id: 202168,
  icon: 'spell_impending_victory',
}

const keepYourFeetOnTheGround: Ability = {
  name: 'Keep Your Feet on the Ground',
  id: 438590,
  icon: 'ability_thunderking_overcharge',
  heroTree: 'Mountain Thane',
  dr: 0.08,
}

const steadfastAsThePeaks: Ability = {
  name: 'Steadfast as the Peaks',
  id: 434970,
  passive: true,
  icon: 'ability_warrior_devastate',
  heroTree: 'Mountain Thane',
  abilityAugmentations: [
    {
      otherAbilityId: impendingVictory.id,
      field: 'healthIncrease',
      value: 0.1,
    },
  ],
}

const mountainOfMuscleAndScars: Ability = {
  name: 'Mountain of Muscle and Scars',
  id: 429642,
  passive: true,
  icon: 'ability_warrior_intensifyrage',
  heroTree: 'Colossus',
  dr: 0.05,
}

export const warriorArmsAbilities = [
  seasonedSoldier,
  mountainOfMuscleAndScars,
  ignorePain,
  defensiveStance,
  spellReflection,
  dieByTheSword,
]

export const warriorFuryAbilities = [
  steadfastAsThePeaks,
  warpaint,
  impendingVictory,
  keepYourFeetOnTheGround,
  defensiveStance,
  spellReflection,
  enragedRegeneration,
]

export const warriorProtAbilities = [
  steadfastAsThePeaks,
  mountainOfMuscleAndScars,
  punish,
  ignorePain,
  impendingVictory,
  keepYourFeetOnTheGround,
  defensiveStanceProt,
  spellReflection,
  lastStand,
  demoralizingShout,
  shieldWall,
]
