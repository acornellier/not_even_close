import type { EnemyAbility } from '../enemies'

export const chronofade: EnemyAbility = {
  name: 'Chronofade',
  damage: 68663,
  aoe: true,
  icon: 'achievement_challengemode_arakkoaspires_hourglass',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=405448/chronofade',
}

export const corrosion: EnemyAbility = {
  name: 'Corrosion',
  damage: 82396,
  aoe: false,
  icon: 'sha_inv_misc_slime_01',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=407406/corrosion',
}

export const dividingStrike: EnemyAbility = {
  name: 'Dividing Strike (split 5 ways)',
  damage: 109862, // 549308 / 5
  aoe: true,
  icon: 'inv_trinket_80_titan01d',
  wowheadLink: 'https://www.wowhead.com/spell=400641/dividing-strike',
}

export const dividingStrikeTwo: EnemyAbility = {
  name: 'Dividing Strike (split 2 ways)',
  damage: 274654, // 549308 / 2
  aoe: true,
  icon: 'inv_trinket_80_titan01d',
  wowheadLink: 'https://www.wowhead.com/spell=400641/dividing-strike',
}

export const chronoburst: EnemyAbility = {
  name: 'Chronoburst',
  damage: 82396,
  aoe: true,
  trashAbility: true,
  icon: 'spell_holy_divineprovidence',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=415769/chronoburst',
}

export const dotiAbilites = [
  chronoburst,
  chronofade,
  corrosion,
  dividingStrike,
  dividingStrikeTwo,
]
