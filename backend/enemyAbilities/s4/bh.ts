import { EnemyAbility } from '../../dungeons'

const gashFrenzy: EnemyAbility = {
  name: 'Gash Frenzy',
  id: 378029,
  icon: 'ability_rogue_murderspree',
  baseDamage: 273563,
  isAoe: true,
  isPhysical: true,
  timeBetweenCasts: 60,
}

const earthBolt: EnemyAbility = {
  name: 'Earth Bolt',
  id: 378155,
  icon: 'inv_10_elementalshardfoozles_earth',
  baseDamage: 237088,
  isAoe: true,
}

const witheredEruption: EnemyAbility = {
  name: 'Withered Eruption',
  id: 387264,
  icon: 'warlock_curse_weakness_aura',
  baseDamage: 328276,
  isAoe: true,
  timeBetweenCasts: 45,
}

const stinkBreath: EnemyAbility = {
  name: 'Stink Breath',
  id: 388060,
  icon: 'spell_fire_felflamebreath',
  baseDamage: 524340,
  isAoe: true,
  isTrashAbility: true,
  timeBetweenCasts: 15,
}

export const bhAbilities = [gashFrenzy, earthBolt, witheredEruption, stinkBreath]
