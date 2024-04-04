import { EnemyAbility } from '../../dungeons'

const ricochetingShield: EnemyAbility = {
  name: 'Ricocheting Shield',
  id: 369677,
  icon: 'spell_holy_avengersshield',
  baseDamage: 455939,
  aoe: false,
  physical: true,
  timeBetweenCasts: 17,
}

const earthenShards: EnemyAbility = {
  name: 'Earthen Shards',
  id: 372718,
  icon: '6bf_blackrock_nova',
  baseDamage: 273564,
  aoe: false,
  physical: true,
  timeBetweenCasts: [10, 30],
}

const crushingStomp: EnemyAbility = {
  name: 'Crushing Stomp',
  id: 372701,
  icon: 'warrior_talent_icon_thunderstruck',
  baseDamage: 273564,
  aoe: true,
  physical: true,
  timeBetweenCasts: 12,
}

const earthquake: EnemyAbility = {
  name: 'Earthquake',
  id: 369328,
  icon: 'spell_nature_earthquake',
  baseDamage: 0,
  aoe: true,
  trashAbility: true,
  physical: true,
  periodic: true,
  timeBetweenCasts: 25,
}

const unstableEmbers: EnemyAbility = {
  name: 'Unstable Embers',
  id: 369110,
  icon: 'ability_creature_cursed_01',
  baseDamage: 328276,
  aoe: true,
  timeBetweenCasts: 12,
}

const seekingFlame: EnemyAbility = {
  name: 'Seeking Flame',
  id: 369052,
  icon: 'spell_fire_fireball02',
  baseDamage: 412917,
  aoe: false,
  avoidable: true,
}

const thunderousClap: EnemyAbility = {
  name: 'Thunderous Clap',
  id: 381593,
  icon: 'ability_earthenfury_giftofearth',
  baseDamage: 291801,
  aoe: true,
  timeBetweenCasts: 20,
}

const wingBuffet: EnemyAbility = {
  name: 'Wing Buffet',
  id: 376049,
  icon: 'inv_icon_wing07e',
  baseDamage: 319157,
  aoe: true,
  timeBetweenCasts: 23,
}

export const uldAbilities = [
  ricochetingShield,
  earthenShards,
  crushingStomp,
  earthquake,
  unstableEmbers,
  seekingFlame,
  thunderousClap,
  wingBuffet,
]
