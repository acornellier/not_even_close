import { EnemyAbility } from '../../dungeons'

const gashFrenzy: EnemyAbility = {
  name: 'Gash Frenzy',
  spellId: 378029,
  iconName: 'ability_rogue_murderspree',
  baseDamage: 0,
  isAoe: true,
  isPhysical: true,
  timeBetweenCasts: 60,
}

const earthBolt: EnemyAbility = {
  name: 'Earth Bolt',
  spellId: 378155,
  iconName: 'inv_10_elementalshardfoozles_earth',
  baseDamage: 237088,
  isAoe: true,
}

const witheredEruption: EnemyAbility = {
  name: 'Withered Eruption',
  spellId: 387264,
  iconName: 'warlock_curse_weakness_aura',
  baseDamage: 328276,
  isAoe: true,
  timeBetweenCasts: 45,
}

const stinkBreath: EnemyAbility = {
  name: 'Stink Breath',
  spellId: 388060,
  iconName: 'spell_fire_felflamebreath',
  baseDamage: 524340,
  isAoe: true,
  isTrashAbility: true,
  timeBetweenCasts: 15,
}

export const bhAbilities = [gashFrenzy, earthBolt, witheredEruption, stinkBreath]
