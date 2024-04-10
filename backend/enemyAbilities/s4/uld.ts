import { getEnemySpellS4 } from '../grimoire'

const ricochetingShield = getEnemySpellS4(369677, {
  timeBetweenCasts: 17,
})

const earthenShards = getEnemySpellS4(372718, {
  timeBetweenCasts: [10, 30],
  notes: 'Only the initial hit.',
})

const crushingStomp = getEnemySpellS4(372701, {
  timeBetweenCasts: 12,
})

const earthenShards4Stacks = getEnemySpellS4(372718, {
  name: 'Earthen Shards @ 5 stacks',
  baseDamage: earthenShards.baseDamage * 1.25,
})

const crushingStomp4Stacks = getEnemySpellS4(372701, {
  name: 'Crushing Stomp @ 5 stacks',
  baseDamage: crushingStomp.baseDamage * 1.25,
})

const earthquake = getEnemySpellS4(369328, {
  baseDamage: getEnemySpellS4(369327).baseDamage * 7,
  trashAbility: true,
  periodic: true,
  timeBetweenCasts: 25,
})

const unstableEmbers = getEnemySpellS4(369116, {
  timeBetweenCasts: 12,
})

const seekingFlame = getEnemySpellS4(369052, {
  avoidable: true,
})

const thunderousClap = getEnemySpellS4(381593, {
  timeBetweenCasts: 20,
})

const wingBuffet = getEnemySpellS4(376049, {
  timeBetweenCasts: 23,
})

export const uldAbilities = [
  ricochetingShield,
  earthenShards,
  crushingStomp,
  earthenShards4Stacks,
  crushingStomp4Stacks,
  earthquake,
  unstableEmbers,
  seekingFlame,
  thunderousClap,
  wingBuffet,
]
