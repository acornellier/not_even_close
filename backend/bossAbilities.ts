export type Dungeon =
  | 'Black Rook Hold'
  | "Atal'Dazar"
  | 'Darkheart Thicket'
  | 'Throne of the Tides'
  | 'Waycrest Manor'
  | 'Dawn of the Infinite'

export type BossAbility = {
  name: string
  boss: string
  dungeon: Dungeon
  damage: number
  isAoe: boolean
  iconName: string
  wowheadLink: string
}

export type DungeonAbilities = {
  dungeon: Dungeon
  abilities: BossAbility[]
}

export const shatteredEarth: BossAbility = {
  name: 'Shattered Earth',
  boss: 'Oakheart',
  dungeon: 'Darkheart Thicket',
  damage: 115355,
  isAoe: true,
  iconName: 'ability_warstomp',
  wowheadLink: 'https://www.wowhead.com/spell=204666/shattered-earth',
}

export const crushingGrip: BossAbility = {
  name: 'Crushing Grip',
  boss: 'Oakheart',
  dungeon: 'Darkheart Thicket',
  damage: 109862,
  isAoe: true,
  iconName: 'ability_warrior_titansgrip',
  wowheadLink: 'https://www.wowhead.com/spell=204611/crushing-grip',
}

export const earthshakingRoar: BossAbility = {
  name: 'Earthshaking Roar',
  boss: 'Dresaron',
  dungeon: 'Darkheart Thicket',
  damage: 109862,
  isAoe: true,
  iconName: 'inv_misc_head_dragon_black_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=199389/earthshaking-roar',
}

export const apocalypticNightmare: BossAbility = {
  name: 'Apocalyptic Nightmare',
  boss: 'Xavius',
  dungeon: 'Darkheart Thicket',
  damage: 137327,
  isAoe: true,
  iconName: 'sha_spell_fire_bluerainoffire_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=204502/apocalyptic-nightmare',
}

export const nightmareBolt: BossAbility = {
  name: 'Nightmare Bolt',
  boss: 'Xavius',
  dungeon: 'Darkheart Thicket',
  damage: 90636,
  isAoe: false,
  iconName: 'sha_spell_fire_bluepyroblast_nightmare',
  wowheadLink: 'https://www.wowhead.com/spell=200185/nightmare-bolt',
}

export const wrackingPain: BossAbility = {
  name: 'Wracking Pain',
  boss: 'Yazma',
  dungeon: "Atal'Dazar",
  damage: 82369,
  isAoe: false,
  iconName: 'ability_warlock_improvedsoulleech',
  wowheadLink: 'https://www.wowhead.com/spell=250096/wracking-pain',
}

export const soulrend: BossAbility = {
  name: 'Soulrend',
  boss: 'Yazma',
  dungeon: "Atal'Dazar",
  damage: 100304,
  isAoe: false,
  iconName: 'ability_demonhunter_soulcleave2',
  wowheadLink: 'https://www.wowhead.com/spell=259190/soulrend',
}

export const focusedTempest: BossAbility = {
  name: 'Focused Tempest',
  boss: "Lady Naz'jar",
  dungeon: 'Throne of the Tides',
  damage: 96129,
  isAoe: false,
  iconName: 'spell_shaman_thunderstorm',
  wowheadLink: 'https://www.wowhead.com/spell=428376/focused-tempest',
}

export const shockBlast: BossAbility = {
  name: 'Shock Blast',
  boss: "Lady Naz'jar",
  dungeon: 'Throne of the Tides',
  damage: 129087,
  isAoe: true,
  iconName: 'spell_shaman_staticshock',
  wowheadLink: 'https://www.wowhead.com/spell=428041/shock-blast',
}

export const festeringShockwave: BossAbility = {
  name: 'Festering Shockwave',
  boss: 'Commander Ulthok',
  dungeon: 'Throne of the Tides',
  damage: 90636,
  isAoe: true,
  iconName: 'spell_fire_twilightnova',
  wowheadLink: 'https://www.wowhead.com/spell=427668/festering-shockwave',
}

export const flameShock: BossAbility = {
  name: 'Flame Shock',
  boss: 'Erunak Stonespeaker',
  dungeon: 'Throne of the Tides',
  damage: 82396,
  isAoe: false,
  iconName: 'spell_fire_flameshock',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=429048/flame-shock',
}

export const shadowBolt: BossAbility = {
  name: 'Shadow Bolt',
  boss: 'Ravencrest',
  dungeon: 'Black Rook Hold',
  damage: 106831,
  isAoe: false,
  iconName: 'spell_shadow_shadowbolt',
  wowheadLink: 'https://www.wowhead.com/spell=198833/shadow-bolt',
}

export const shadowBoltVolley: BossAbility = {
  name: 'Shadow Bolt Volley',
  boss: 'Ravencrest',
  dungeon: 'Black Rook Hold',
  damage: 164792,
  isAoe: true,
  iconName: 'spell_shadow_shadowbolt',
  wowheadLink: 'https://www.wowhead.com/spell=202019/shadow-bolt-volley',
}

export const dreadEssence: BossAbility = {
  name: 'Dread Essence',
  boss: 'Gorak Tul',
  dungeon: 'Waycrest Manor',
  damage: 96129,
  isAoe: true,
  iconName: 'ability_argus_soulburst',
  wowheadLink: 'https://www.wowhead.com/spell=266181/dread-essence',
}

export const corrosion: BossAbility = {
  name: 'Corrosion',
  boss: 'Blight of Galakrond',
  dungeon: 'Dawn of the Infinite',
  damage: 82396,
  isAoe: false,
  iconName: 'sha_inv_misc_slime_01',
  wowheadLink: 'https://www.wowhead.com/ptr-2/spell=407406/corrosion',
}

export const dividingStrike: BossAbility = {
  name: 'Dividing Strike',
  boss: 'Tyr',
  dungeon: 'Dawn of the Infinite',
  damage: 109862, // 549308 / 5
  isAoe: true,
  iconName: 'inv_trinket_80_titan01d',
  wowheadLink: 'https://www.wowhead.com/spell=400641/dividing-strike',
}

export const bossAbilities: BossAbility[] = [
  crushingGrip,
  shatteredEarth,
  earthshakingRoar,
  nightmareBolt,
  apocalypticNightmare,
  shadowBolt,
  shadowBoltVolley,
  focusedTempest,
  shockBlast,
  festeringShockwave,
  flameShock,
  wrackingPain,
  soulrend,
  dreadEssence,
  corrosion,
  dividingStrike,
]

export const bossAbilitiesByDungeon: DungeonAbilities[] = bossAbilities
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
