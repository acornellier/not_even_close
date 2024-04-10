import { getEnemySpellS4 } from '../grimoire'

const ricochetingShield = getEnemySpellS4(369677, {
  cooldown: 17,
})

const earthenShards = getEnemySpellS4(372718, {
  cooldown: [10, 30],
  notes: 'Only the initial hit.',
})

const crushingStomp = getEnemySpellS4(372701, {
  cooldown: 12,
})

const earthenShards4Stacks = getEnemySpellS4(372718, {
  name: 'Earthen Shards @ 5 stacks',
  damage: earthenShards.damage * 1.25,
})

const crushingStomp4Stacks = getEnemySpellS4(372701, {
  name: 'Crushing Stomp @ 5 stacks',
  damage: crushingStomp.damage * 1.25,
})

const earthquake = getEnemySpellS4(369328, {
  damage: getEnemySpellS4(369327).damage * 7,
  trashAbility: true,
  periodic: true,
  cooldown: 25,
})

const unstableEmbers = getEnemySpellS4(369116, {
  cooldown: 12,
})

const seekingFlame = getEnemySpellS4(369052, {
  avoidable: true,
})

const thunderousClap = getEnemySpellS4(381593, {
  cooldown: 20,
})

const wingBuffet = getEnemySpellS4(376049, {
  cooldown: 23,
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
