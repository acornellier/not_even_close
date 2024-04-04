import { EnemyAbility } from '../dungeons'

export const waterBolt: EnemyAbility = {
  name: 'Water Bolt',
  baseDamage: 68663,
  aoe: false,
  trashAbility: true,
  icon: 'ability_mage_waterjet',
  wowheadLink: 'https://www.wowhead.com/spell=426731/water-bolt',
}

export const acidBarrage: EnemyAbility = {
  name: 'Acid Barrage',
  baseDamage: 71410,
  aoe: true,
  trashAbility: true,
  icon: 'inv_ammo_arrow_04',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=426645/acid-barrage',
}

export const focusedTempest: EnemyAbility = {
  name: 'Focused Tempest',
  baseDamage: 96129,
  aoe: false,
  icon: 'spell_shaman_thunderstorm',
  wowheadLink: 'https://www.wowhead.com/spell=428376/focused-tempest',
}

export const shockBlast: EnemyAbility = {
  name: 'Shock Blast',
  baseDamage: 129087,
  aoe: true,
  icon: 'spell_shaman_staticshock',
  wowheadLink: 'https://www.wowhead.com/spell=428041/shock-blast',
}

export const festeringShockwave: EnemyAbility = {
  name: 'Festering Shockwave',
  baseDamage: 90636,
  aoe: true,
  icon: 'spell_fire_twilightnova',
  wowheadLink: 'https://www.wowhead.com/spell=427668/festering-shockwave',
}

export const flameShock: EnemyAbility = {
  name: 'Flame Shock',
  baseDamage: 82396,
  aoe: false,
  icon: 'spell_fire_flameshock',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=429048/flame-shock',
}

export const blottingBarrage: EnemyAbility = {
  name: 'Blotting Barrage',
  baseDamage: 82397,
  variance: 0.02,
  aoe: true,
  icon: 'ability_vehicle_oiljets',
  wowheadLink: 'https://www.wowhead.com/spell=428405/blotting-barrage',
}

export const tottAbilities = [
  waterBolt,
  acidBarrage,
  focusedTempest,
  shockBlast,
  festeringShockwave,
  flameShock,
  blottingBarrage,
]
