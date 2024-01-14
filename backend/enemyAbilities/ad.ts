import { EnemyAbility } from '../enemyAbilities'

export const wrackingPain: EnemyAbility = {
  name: 'Wracking Pain',
  boss: 'Yazma',
  dungeon: "Atal'Dazar",
  damage: 82369,
  isAoe: false,
  iconName: 'ability_warlock_improvedsoulleech',
  wowheadLink: 'https://www.wowhead.com/spell=250096/wracking-pain',
}

export const soulrend: EnemyAbility = {
  name: 'Soulrend',
  boss: 'Yazma',
  dungeon: "Atal'Dazar",
  damage: Math.round(100304 * 1.02), // upper end of 2% damage variance
  isAoe: false,
  iconName: 'ability_demonhunter_soulcleave2',
  wowheadLink: 'https://www.wowhead.com/spell=259190/soulrend',
}

export const adAbilities = [wrackingPain, soulrend]
