import { EnemyAbility } from '../../dungeons'

const shardsOfStone: EnemyAbility = {
  name: 'Shards of Stone',
  spellId: 388817,
  iconName: 'inv_10_elementalshardfoozles_earth',
  baseDamage: 328276,
  isAoe: true,
  timeBetweenCasts: [13, 25],
}

const lightningStrike: EnemyAbility = {
  name: 'Lightning Strike',
  spellId: 384316,
  iconName: 'ability_vehicle_electrocharge',
  baseDamage: 328276,
  isAoe: true,
}

const galeArrow: EnemyAbility = {
  name: 'Gale Arrow',
  spellId: 382670,
  iconName: 'ability_skyreach_four_wind',
  baseDamage: 419464,
  isAoe: false,
}

const rainOfArrows: EnemyAbility = {
  name: 'Rain of Arrows',
  spellId: 384476,
  iconName: 'ability_hunter_quickshot',
  baseDamage: 364751,
  isAoe: true,
  isTrashAbility: true,
}

const chainLightning: EnemyAbility = {
  name: 'Chain Lightning',
  spellId: 387127,
  iconName: 'spell_nature_chainlightning',
  baseDamage: 319157,
  isAoe: false,
  isTrashAbility: true,
}

const ironSpear: EnemyAbility = {
  name: 'Iron Spear',
  spellId: 376634,
  iconName: 'inv_spear_07',
  baseDamage: 547127,
  isAoe: true,
}

const staticSpear: EnemyAbility = {
  name: 'Static Spear',
  spellId: 376864,
  iconName: 'inv_spear_04',
  baseDamage: 364751 + 191494,
  isAoe: true,
}

const cracklingUpheaval: EnemyAbility = {
  name: 'Crackling Upheaval',
  spellId: 376892,
  iconName: 'spell_nature_unrelentingstorm',
  baseDamage: 364751,
  isAoe: true,
}

const lightning: EnemyAbility = {
  name: 'Lightning',
  spellId: 376737,
  iconName: 'spell_nature_stormreach',
  baseDamage: 577076,
  isAoe: true,
}

export const nokAbilities = [
  shardsOfStone,
  lightningStrike,
  galeArrow,
  ironSpear,
  staticSpear,
  cracklingUpheaval,
  rainOfArrows,
  chainLightning,
  lightning,
]
