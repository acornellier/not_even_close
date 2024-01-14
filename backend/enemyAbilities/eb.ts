import { EnemyAbility } from '../enemyAbilities'

export const colossalBlow: EnemyAbility = {
  name: 'Colossal Blow',
  boss: 'Yalnu',
  dungeon: 'Everbloom',
  damage: 87889,
  isAoe: true,
  iconName: 'spell_shaman_earthquake',
  wowheadLink: 'https://www.wowhead.com/spell=169179/colossal-blow',
}

export const ebAbilities = [colossalBlow]
