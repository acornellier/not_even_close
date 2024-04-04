import { EnemyAbility } from '../dungeons'

export const soulBlast: EnemyAbility = {
  name: 'Soul Blast',
  baseDamage: 82396,
  aoe: false,
  trashAbility: true,
  icon: 'spell_shadow_painspike',
  wowheadLink: 'https://www.wowhead.com/spell=199663/soul-blast',
}

export const soulBurst: EnemyAbility = {
  name: 'Soul Burst',
  baseDamage: 123594,
  aoe: true,
  icon: 'ability_bossgorefiend_touchofdoom',
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
  aoe: true,
  physical: true,
  ignoresArmor: true,
  icon: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=198073/earthshaking-stomp',
}

export const hatefulCharge: EnemyAbility = {
  name: 'Hateful Charge',
  baseDamage: 123594,
  aoe: true,
  physical: true,
  ignoresArmor: true,
  icon: 'ability_monk_clashingoxcharge',
  wowheadLink: 'https://www.wowhead.com/spell=224188/hateful-charge',
}

export const shadowBolt: EnemyAbility = {
  name: 'Shadow Bolt',
  baseDamage: 106831,
  aoe: true,
  icon: 'spell_shadow_shadowbolt',
  wowheadLink: 'https://www.wowhead.com/spell=198833/shadow-bolt',
}

export const shadowBoltVolley: EnemyAbility = {
  name: 'Shadow Bolt Volley',
  baseDamage: 164792,
  aoe: true,
  icon: 'spell_shadow_shadowbolt',
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
