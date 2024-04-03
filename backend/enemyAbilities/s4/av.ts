import { EnemyAbility } from '../../dungeons'

const explosiveBrand: EnemyAbility = {
  name: 'Explosive Brand',
  id: 374567,
  icon: 'spell_arcane_arcanetorrent',
  baseDamage: 729502,
  isAoe: true,
  timeBetweenCasts: 50,
}

const consumingStomp: EnemyAbility = {
  name: 'Consuming Stomp',
  id: 374720,
  icon: 'spell_arcane_blast',
  baseDamage: 410345,
  isAoe: true,
  timeBetweenCasts: 50,
}

const frostBomb: EnemyAbility = {
  name: 'Frost Bomb',
  id: 386781,
  icon: 'inv_10_elementalcombinedfoozles_frost',
  baseDamage: 273563,
  isAoe: true,
  timeBetweenCasts: [15, 30],
}

const absoluteZero: EnemyAbility = {
  name: 'Absolute Zero',
  id: 388008,
  icon: 'spell_frost_arcticwinds',
  baseDamage: 820690 / 2,
  isAoe: true,
  timeBetweenCasts: 60,
}

const unleashedDestruction: EnemyAbility = {
  name: 'Unleashed Destruction',
  id: 388804,
  icon: 'spell_arcane_blast',
  baseDamage: 218851,
  isAoe: true,
  timeBetweenCasts: 105,
}

const shoulderSlam: EnemyAbility = {
  name: 'Shoulder Slam',
  id: 391136,
  icon: 'ability_warrior_shieldcharge',
  baseDamage: 328276,
  isAoe: true,
  isPhysical: true,
  isTrashAbility: true,
  timeBetweenCasts: 12,
}

export const avAbilities = [
  explosiveBrand,
  consumingStomp,
  frostBomb,
  absoluteZero,
  unleashedDestruction,
  shoulderSlam,
]
