import { EnemyAbility } from '../../dungeons'

const explosiveBrand: EnemyAbility = {
  name: 'Explosive Brand',
  spellId: 374567,
  iconName: 'spell_arcane_arcanetorrent',
  baseDamage: 729502,
  isAoe: true,
  timeBetweenCasts: 50,
}

const consumingStomp: EnemyAbility = {
  name: 'Consuming Stomp',
  spellId: 374720,
  iconName: 'spell_arcane_blast',
  baseDamage: 410345,
  isAoe: true,
  timeBetweenCasts: 50,
}

const frostBomb: EnemyAbility = {
  name: 'Frost Bomb',
  spellId: 386781,
  iconName: 'inv_10_elementalcombinedfoozles_frost',
  baseDamage: 273563,
  isAoe: true,
  timeBetweenCasts: [15, 30],
}

const absoluteZero: EnemyAbility = {
  name: 'Absolute Zero',
  spellId: 388008,
  iconName: 'spell_frost_arcticwinds',
  baseDamage: 820690,
  isAoe: true,
  timeBetweenCasts: 60,
}

const unleashedDestruction: EnemyAbility = {
  name: 'Unleashed Destruction',
  spellId: 388804,
  iconName: 'spell_arcane_blast',
  baseDamage: 218851,
  isAoe: true,
  timeBetweenCasts: 105,
}

const shoulderSlam: EnemyAbility = {
  name: 'Shoulder Slam',
  spellId: 391136,
  iconName: 'ability_warrior_shieldcharge',
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
