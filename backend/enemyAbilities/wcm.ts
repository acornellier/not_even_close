import { EnemyAbility } from '../enemyAbilities'

export const dreadEssence: EnemyAbility = {
  name: 'Dread Essence',
  boss: 'Gorak Tul',
  dungeon: 'Waycrest Manor',
  damage: 96129,
  isAoe: true,
  iconName: 'ability_argus_soulburst',
  wowheadLink: 'https://www.wowhead.com/spell=266181/dread-essence',
}

export const rottenExpulsion: EnemyAbility = {
  name: 'Rotten Expulsion',
  dungeon: 'Waycrest Manor',
  damage: 105742,
  isAoe: true,
  iconName: 'ability_creature_disease_01',
  wowheadLink: 'https://www.wowhead.com/spell=264694/rotten-expulsion',
}

export const wcmAbilities = [rottenExpulsion, dreadEssence]
