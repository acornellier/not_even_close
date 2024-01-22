import { EnemyAbility } from '../dungeons'

export const acidBarrage: EnemyAbility = {
  name: 'Acid Barrage',
  dungeon: 'Throne of the Tides',
  baseDamage: 71410,
  isAoe: true,
  isTrashAbility: true,
  iconName: 'inv_ammo_arrow_04',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=426645/acid-barrage',
}

export const focusedTempest: EnemyAbility = {
  name: 'Focused Tempest',
  boss: "Lady Naz'jar",
  dungeon: 'Throne of the Tides',
  baseDamage: 96129,
  isAoe: false,
  iconName: 'spell_shaman_thunderstorm',
  wowheadLink: 'https://www.wowhead.com/spell=428376/focused-tempest',
}

export const shockBlast: EnemyAbility = {
  name: 'Shock Blast',
  boss: "Lady Naz'jar",
  dungeon: 'Throne of the Tides',
  baseDamage: 129087,
  isAoe: true,
  iconName: 'spell_shaman_staticshock',
  wowheadLink: 'https://www.wowhead.com/spell=428041/shock-blast',
}

export const festeringShockwave: EnemyAbility = {
  name: 'Festering Shockwave',
  boss: 'Commander Ulthok',
  dungeon: 'Throne of the Tides',
  baseDamage: 90636,
  isAoe: true,
  iconName: 'spell_fire_twilightnova',
  wowheadLink: 'https://www.wowhead.com/spell=427668/festering-shockwave',
}

export const flameShock: EnemyAbility = {
  name: 'Flame Shock',
  boss: 'Erunak Stonespeaker',
  dungeon: 'Throne of the Tides',
  baseDamage: 82396,
  isAoe: false,
  iconName: 'spell_fire_flameshock',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=429048/flame-shock',
}

export const blottingBarrage: EnemyAbility = {
  name: 'Blotting Barrage',
  dungeon: 'Throne of the Tides',
  baseDamage: 82397,
  variance: 0.02,
  isAoe: true,
  iconName: 'ability_vehicle_oiljets',
  wowheadLink: 'https://www.wowhead.com/spell=428405/blotting-barrage',
}

export const tottAbilities = [
  acidBarrage,
  focusedTempest,
  shockBlast,
  festeringShockwave,
  flameShock,
  blottingBarrage,
]
