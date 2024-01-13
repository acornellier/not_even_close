export type Dungeon =
  | 'Black Rook Hold'
  | "Atal'Dazar"
  | 'Darkheart Thicket'
  | 'Throne of the Tides'
  | 'Waycrest Manor'
  | 'Dawn of the Infinite'
  | 'Everbloom'

export type EnemyAbility = {
  name: string
  boss?: string
  dungeon: Dungeon
  damage: number
  isAoe: boolean
  isTrashAbility?: boolean
  isPhysical?: boolean
  isReducedByArmor?: boolean
  iconName: string
  wowheadLink: string
}

export type DungeonAbilities = {
  dungeon: Dungeon
  abilities: EnemyAbility[]
}

export const shatteredEarth: EnemyAbility = {
  name: 'Shattered Earth',
  boss: 'Oakheart',
  dungeon: 'Darkheart Thicket',
  damage: 115355,
  isAoe: true,
  iconName: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=204666/shattered-earth',
}

export const crushingGrip: EnemyAbility = {
  name: 'Crushing Grip',
  boss: 'Oakheart',
  dungeon: 'Darkheart Thicket',
  damage: 109862,
  isAoe: true,
  iconName: 'ability_warrior_titansgrip',
  wowheadLink: 'https://www.wowhead.com/spell=204611/crushing-grip',
}

export const earthshakingRoar: EnemyAbility = {
  name: 'Earthshaking Roar',
  boss: 'Dresaron',
  dungeon: 'Darkheart Thicket',
  damage: 109862,
  isAoe: true,
  iconName: 'inv_misc_head_dragon_black_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=199389/earthshaking-roar',
}

export const apocalypticNightmare: EnemyAbility = {
  name: 'Apocalyptic Nightmare',
  boss: 'Xavius',
  dungeon: 'Darkheart Thicket',
  damage: 137327,
  isAoe: true,
  iconName: 'sha_spell_fire_bluerainoffire_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=204502/apocalyptic-nightmare',
}

export const nightmareBolt: EnemyAbility = {
  name: 'Nightmare Bolt',
  boss: 'Xavius',
  dungeon: 'Darkheart Thicket',
  damage: Math.round(90636 * 1.02), // upper end of 2% damage variance
  isAoe: false,
  iconName: 'sha_spell_fire_bluepyroblast_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=200185/nightmare-bolt',
}

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

export const acidBarrage: EnemyAbility = {
  name: 'Acid Barrage',
  dungeon: 'Throne of the Tides',
  damage: 71410,
  isAoe: true,
  isTrashAbility: true,
  iconName: 'inv_ammo_arrow_04',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=426645/acid-barrage',
}

export const focusedTempest: EnemyAbility = {
  name: 'Focused Tempest',
  boss: "Lady Naz'jar",
  dungeon: 'Throne of the Tides',
  damage: 96129,
  isAoe: false,
  iconName: 'spell_shaman_thunderstorm',
  wowheadLink: 'https://www.wowhead.com/spell=428376/focused-tempest',
}

export const shockBlast: EnemyAbility = {
  name: 'Shock Blast',
  boss: "Lady Naz'jar",
  dungeon: 'Throne of the Tides',
  damage: 129087,
  isAoe: true,
  iconName: 'spell_shaman_staticshock',
  wowheadLink: 'https://www.wowhead.com/spell=428041/shock-blast',
}

export const festeringShockwave: EnemyAbility = {
  name: 'Festering Shockwave',
  boss: 'Commander Ulthok',
  dungeon: 'Throne of the Tides',
  damage: 90636,
  isAoe: true,
  iconName: 'spell_fire_twilightnova',
  wowheadLink: 'https://www.wowhead.com/spell=427668/festering-shockwave',
}

export const flameShock: EnemyAbility = {
  name: 'Flame Shock',
  boss: 'Erunak Stonespeaker',
  dungeon: 'Throne of the Tides',
  damage: 82396,
  isAoe: false,
  iconName: 'spell_fire_flameshock',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=429048/flame-shock',
}

export const blottingBarrage: EnemyAbility = {
  name: 'Blotting Barrage',
  dungeon: 'Throne of the Tides',
  damage: Math.round(82397 * 1.02), // upper end of 2% damage variance
  isAoe: true,
  iconName: 'ability_vehicle_oiljets',
  wowheadLink: 'https://www.wowhead.com/spell=428405/blotting-barrage',
}

export const soulBurst: EnemyAbility = {
  name: 'Soul Burst',
  boss: 'The Amalgam of Souls',
  dungeon: 'Black Rook Hold',
  damage: 123594,
  isAoe: true,
  iconName: 'ability_bossgorefiend_touchofdoom',
  wowheadLink: 'https://www.wowhead.com/spell=196587/soul-burst#icon',
}

export const soulBurstMaxStacks: EnemyAbility = {
  ...soulBurst,
  name: 'Soul Burst (max stacks)',
  damage: 383141,
}

export const shadowBolt: EnemyAbility = {
  name: 'Shadow Bolt',
  boss: 'Ravencrest',
  dungeon: 'Black Rook Hold',
  damage: 106831,
  isAoe: true,
  iconName: 'spell_shadow_shadowbolt',
  wowheadLink: 'https://www.wowhead.com/spell=198833/shadow-bolt',
}

export const shadowBoltVolley: EnemyAbility = {
  name: 'Shadow Bolt Volley',
  boss: 'Ravencrest',
  dungeon: 'Black Rook Hold',
  damage: 164792,
  isAoe: true,
  iconName: 'spell_shadow_shadowbolt',
  wowheadLink: 'https://www.wowhead.com/spell=202019/shadow-bolt-volley',
}

export const dreadEssence: EnemyAbility = {
  name: 'Dread Essence',
  boss: 'Gorak Tul',
  dungeon: 'Waycrest Manor',
  damage: 96129,
  isAoe: true,
  iconName: 'ability_argus_soulburst',
  wowheadLink: 'https://www.wowhead.com/spell=266181/dread-essence',
}

export const chronofade: EnemyAbility = {
  name: 'Chronofade',
  boss: 'Manifested Timeways',
  dungeon: 'Dawn of the Infinite',
  damage: 68663,
  isAoe: false,
  iconName: 'achievement_challengemode_arakkoaspires_hourglass',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=405448/chronofade',
}

export const corrosion: EnemyAbility = {
  name: 'Corrosion',
  boss: 'Blight of Galakrond',
  dungeon: 'Dawn of the Infinite',
  damage: 82396,
  isAoe: false,
  iconName: 'sha_inv_misc_slime_01',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=407406/corrosion',
}

export const dividingStrike: EnemyAbility = {
  name: 'Dividing Strike (split 5 ways)',
  boss: 'Tyr',
  dungeon: 'Dawn of the Infinite',
  damage: 109862, // 549308 / 5
  isAoe: true,
  iconName: 'inv_trinket_80_titan01d',
  wowheadLink: 'https://www.wowhead.com/spell=400641/dividing-strike',
}

export const colossalBlow: EnemyAbility = {
  name: 'Colossal Blow',
  boss: 'Yalnu',
  dungeon: 'Everbloom',
  damage: 87889,
  isAoe: true,
  iconName: 'spell_shaman_earthquake',
  wowheadLink: 'https://www.wowhead.com/spell=169179/colossal-blow',
}

export const chronoburst: EnemyAbility = {
  name: 'Chronoburst',
  dungeon: 'Dawn of the Infinite',
  damage: 82396,
  isAoe: true,
  isTrashAbility: true,
  iconName: 'spell_holy_divineprovidence',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=415769/chronoburst',
}

export const earthShakingStomp: EnemyAbility = {
  name: 'Earthshaking Stomp',
  dungeon: 'Black Rook Hold',
  damage: 96129,
  isAoe: true,
  isPhysical: true,
  iconName: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=198073/earthshaking-stomp',
}

export const hatefulCharge: EnemyAbility = {
  name: 'Hateful Charge',
  dungeon: 'Black Rook Hold',
  damage: 123594,
  isAoe: true,
  isPhysical: true,
  iconName: 'ability_monk_clashingoxcharge',
  wowheadLink: 'https://www.wowhead.com/spell=224188/hateful-charge',
}

export const enemyAbilities: EnemyAbility[] = [
  crushingGrip,
  shatteredEarth,
  earthshakingRoar,
  nightmareBolt,
  apocalypticNightmare,
  soulBurst,
  soulBurstMaxStacks,
  earthShakingStomp,
  hatefulCharge,
  shadowBolt,
  shadowBoltVolley,
  acidBarrage,
  focusedTempest,
  shockBlast,
  festeringShockwave,
  flameShock,
  blottingBarrage,
  wrackingPain,
  soulrend,
  dreadEssence,
  chronoburst,
  chronofade,
  corrosion,
  dividingStrike,
  colossalBlow,
]

export const enemyAbilitiesByDungeon: DungeonAbilities[] = enemyAbilities
  .reduce<DungeonAbilities[]>((acc, ability) => {
    let dungeon = acc.find((v) => v.dungeon === ability.dungeon)
    if (!dungeon) {
      dungeon = { dungeon: ability.dungeon, abilities: [] }
      acc.push(dungeon)
    }

    dungeon.abilities.push(ability)
    return acc
  }, [])
  .sort((a, b) => a.dungeon.localeCompare(b.dungeon))
