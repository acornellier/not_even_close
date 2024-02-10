import { EnemyAbility } from '../dungeons'

export const chronofade: EnemyAbility = {
  name: 'Chronofade',
  boss: 'Manifested Timeways',
  dungeon: 'Dawn of the Infinite',
  baseDamage: 68663,
  isAoe: true,
  iconName: 'achievement_challengemode_arakkoaspires_hourglass',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=405448/chronofade',
}

export const corrosion: EnemyAbility = {
  name: 'Corrosion',
  boss: 'Blight of Galakrond',
  dungeon: 'Dawn of the Infinite',
  baseDamage: 82396,
  isAoe: false,
  iconName: 'sha_inv_misc_slime_01',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=407406/corrosion',
}

export const dividingStrike: EnemyAbility = {
  name: 'Dividing Strike (split 5 ways)',
  boss: 'Tyr',
  dungeon: 'Dawn of the Infinite',
  baseDamage: 109862, // 549308 / 5
  isAoe: true,
  iconName: 'inv_trinket_80_titan01d',
  wowheadLink: 'https://www.wowhead.com/spell=400641/dividing-strike',
}

export const dividingStrikeTwo: EnemyAbility = {
  name: 'Dividing Strike (split 2 ways)',
  boss: 'Tyr',
  dungeon: 'Dawn of the Infinite',
  baseDamage: 274654, // 549308 / 2
  isAoe: true,
  iconName: 'inv_trinket_80_titan01d',
  wowheadLink: 'https://www.wowhead.com/spell=400641/dividing-strike',
}

export const chronoburst: EnemyAbility = {
  name: 'Chronoburst',
  dungeon: 'Dawn of the Infinite',
  baseDamage: 82396,
  isAoe: true,
  isTrashAbility: true,
  iconName: 'spell_holy_divineprovidence',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=415769/chronoburst',
}

export const chronomelt: EnemyAbility = {
  name: 'Chronomelt',
  dungeon: 'Dawn of the Infinite',
  baseDamage: 21972,
  isAoe: false,
  isTrashAbility: true,
  iconName: 'inv_10_enchanting2_magicswirl_bronze',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=412393/chronomelt',
}

export const dotiAbilites = [
  chronoburst,
  chronofade,
  chronomelt,
  corrosion,
  dividingStrike,
  dividingStrikeTwo,
]
