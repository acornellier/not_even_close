import { EnemyAbility } from '../dungeons'

export const soulBlast: EnemyAbility = {
  name: 'Soul Blast',
  baseDamage: 82396,
  isAoe: false,
  isTrashAbility: true,
  iconName: 'spell_shadow_painspike',
  wowheadLink: 'https://www.wowhead.com/spell=199663/soul-blast',
}

export const soulBurst: EnemyAbility = {
  name: 'Soul Burst',
  boss: 'The Amalgam of Souls',
  baseDamage: 123594,
  isAoe: true,
  iconName: 'ability_bossgorefiend_touchofdoom',
  wowheadLink: 'https://www.wowhead.com/spell=196587/soul-burst#icon',
}

export const soulBurstMaxStacks: EnemyAbility = {
  ...soulBurst,
  name: 'Soul Burst (max stacks)',
  baseDamage: 383141,
}

export const earthShakingStomp: EnemyAbility = {
  name: 'Earthshaking Stomp',
  baseDamage: 96129,
  isAoe: true,
  isPhysical: true,
  ignoresArmor: true,
  iconName: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=198073/earthshaking-stomp',
}

export const hatefulCharge: EnemyAbility = {
  name: 'Hateful Charge',
  baseDamage: 123594,
  isAoe: true,
  isPhysical: true,
  ignoresArmor: true,
  iconName: 'ability_monk_clashingoxcharge',
  wowheadLink: 'https://www.wowhead.com/spell=224188/hateful-charge',
}

export const shadowBolt: EnemyAbility = {
  name: 'Shadow Bolt',
  boss: 'Ravencrest',
  baseDamage: 106831,
  isAoe: true,
  iconName: 'spell_shadow_shadowbolt',
  wowheadLink: 'https://www.wowhead.com/spell=198833/shadow-bolt',
}

export const shadowBoltVolley: EnemyAbility = {
  name: 'Shadow Bolt Volley',
  boss: 'Ravencrest',
  baseDamage: 164792,
  isAoe: true,
  iconName: 'spell_shadow_shadowbolt',
  wowheadLink: 'https://www.wowhead.com/spell=202019/shadow-bolt-volley',
}

export const brhAbilities = [
  soulBlast,
  soulBurst,
  soulBurstMaxStacks,
  earthShakingStomp,
  hatefulCharge,
  shadowBolt,
  shadowBoltVolley,
]
