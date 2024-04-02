import { EnemyAbility } from '../../dungeons'

const shardsOfStone: EnemyAbility = {
  name: 'Shards of Stone',
  baseDamage: 328276,
  iconName: 'inv_10_elementalshardfoozles_earth',
  isAoe: true,
  wowheadLink: 'https://www.wowhead.com/spell=388817/shards-of-stone',
  timeBetweenCasts: [13, 25],
}

export const nokAbilities = [shardsOfStone]
