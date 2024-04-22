import { getEnemySpell } from '../grimoire'

const ricochetingShield = getEnemySpell(369677, {
  cooldown: 17,
})

const earthenShards = getEnemySpell(372718, {
  cooldown: [10, 30],
  notes: 'Only the initial hit.',
})

const crushingStomp = getEnemySpell(372701, {
  cooldown: 12,
})

const earthenShards4Stacks = {
  ...earthenShards,
  name: 'Earthen Shards @ 5 stacks',
  damage: Math.round(earthenShards.damage * 1.25),
}

const crushingStomp4Stacks = {
  ...crushingStomp,
  name: 'Crushing Stomp @ 5 stacks',
  damage: Math.round(crushingStomp.damage * 1.25),
}

const earthquake = getEnemySpell(369328, {
  damage: getEnemySpell(369327).damage * 7,
  trashAbility: true,
  periodic: true,
  cooldown: 25,
})

const unstableEmbers = getEnemySpell(369116, {
  cooldown: 12,
})

const seekingFlame = getEnemySpell(369052, {
  avoidable: true,
})

const thunderousClap = getEnemySpell(381593, {
  cooldown: 20,
})

const wingBuffet = getEnemySpell(376049, {
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
