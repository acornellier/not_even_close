import { EnemyAbility } from '../../dungeons'

const explosiveBrand: EnemyAbility = {
  name: 'Explosive Brand',
  spellId: 374567,
  iconName: 'spell_arcane_arcanetorrent',
  baseDamage: 729502,
  isAoe: true,
}

const consumingStomp: EnemyAbility = {
  name: 'Consuming Stomp',
  spellId: 374720,
  iconName: 'spell_arcane_blast',
  baseDamage: 410345,
  isAoe: true,
}

const frostBomb: EnemyAbility = {
  name: 'Frost Bomb',
  spellId: 386781,
  iconName: 'inv_10_elementalcombinedfoozles_frost',
  baseDamage: 273563,
  isAoe: true,
}

const absoluteZero: EnemyAbility = {
  name: 'Absolute Zero',
  spellId: 388008,
  iconName: 'spell_frost_arcticwinds',
  baseDamage: 820690,
  isAoe: true,
}

const unleashedDestruction: EnemyAbility = {
  name: 'Unleashed Destruction',
  spellId: 388804,
  iconName: 'spell_arcane_blast',
  baseDamage: 218851,
  isAoe: true,
}

const shoulderSlam: EnemyAbility = {
  name: 'Shoulder Slam',
  spellId: 391136,
  iconName: 'ability_warrior_shieldcharge',
  baseDamage: 328276,
  isAoe: true,
  isPhysical: true,
  isTrashAbility: true,
}

export const avAbilities = [
  explosiveBrand,
  consumingStomp,
  frostBomb,
  absoluteZero,
  unleashedDestruction,
  shoulderSlam,
]
