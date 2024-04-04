import { EnemyAbility } from '../../dungeons'

const shardsOfStone: EnemyAbility = {
  name: 'Shards of Stone',
  id: 388817,
  icon: 'inv_10_elementalshardfoozles_earth',
  baseDamage: 328276,
  aoe: true,
  timeBetweenCasts: [13, 25],
}

const lightningStrike: EnemyAbility = {
  name: 'Lightning Strike',
  id: 384316,
  icon: 'ability_vehicle_electrocharge',
  baseDamage: 328276,
  aoe: true,
  timeBetweenCasts: 20,
}

const galeArrow: EnemyAbility = {
  name: 'Gale Arrow',
  id: 382670,
  icon: 'ability_skyreach_four_wind',
  baseDamage: 419464,
  aoe: false,
  timeBetweenCasts: 57,
}

const ironSpear: EnemyAbility = {
  name: 'Iron Spear',
  id: 376634,
  icon: 'inv_spear_07',
  baseDamage: 547127,
  aoe: true,
  timeBetweenCasts: 35,
  counterplay: {
    combatDrop: 'cancel',
  },
}

const staticSpear: EnemyAbility = {
  name: 'Static Spear',
  id: 376864,
  icon: 'inv_spear_04',
  baseDamage: 364751 + 191494,
  aoe: true,
  timeBetweenCasts: 39,
  counterplay: {
    combatDrop: 'cancel',
  },
}

const cracklingUpheaval: EnemyAbility = {
  name: 'Crackling Upheaval',
  id: 376892,
  icon: 'spell_nature_unrelentingstorm',
  baseDamage: 364751,
  aoe: true,
  timeBetweenCasts: 37,
}

const lightning: EnemyAbility = {
  name: 'Lightning',
  id: 376737,
  icon: 'spell_nature_stormreach',
  baseDamage: 577076,
  aoe: true,
  avoidable: true,
  notes: 'Swirlies during Balakar Khan intermission and P2',
}

const rainOfArrows: EnemyAbility = {
  name: 'Rain of Arrows',
  id: 384476,
  icon: 'ability_hunter_quickshot',
  baseDamage: 364751,
  aoe: true,
  trashAbility: true,
  avoidable: true,
  notes: 'Swirlies cast by Nokhud Longbow in first area',
}

const chainLightning: EnemyAbility = {
  name: 'Chain Lightning',
  id: 387127,
  icon: 'spell_nature_chainlightning',
  baseDamage: 319157,
  aoe: false,
  trashAbility: true,
  timeBetweenCasts: 24,
}

export const nokAbilities = [
  shardsOfStone,
  lightningStrike,
  galeArrow,
  ironSpear,
  staticSpear,
  cracklingUpheaval,
  lightning,
  rainOfArrows,
  chainLightning,
]
