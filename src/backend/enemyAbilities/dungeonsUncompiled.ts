import type { Dungeon } from './enemies'
import { magiAbilities } from './midnight/magi.ts'
import { cavnsAbilities } from './midnight/cavns.ts'
import { xenasAbilities } from './midnight/xenas.ts'
import { windAbilities } from './midnight/wind.ts'
import { aaAbilities } from './midnight/aa.ts'
import { pitAbilities } from './midnight/pit.ts'
import { seatAbilities } from './midnight/seat.ts'
import { skyAbilities } from './midnight/sky.ts'

export const dungeonsUncompiled: Dungeon[] = [
  {
    key: 'magi',
    name: "Magister's Terrace",
    abilities: magiAbilities,
    icon: 'inv_achievement_dungeon_magistersterrace',
  },
  {
    key: 'cavns',
    name: 'Maisara Caverns',
    abilities: cavnsAbilities,
    icon: 'inv_achievement_dungeon_maisarahills',
  },
  {
    key: 'xenas',
    name: 'Nexus-Point Xenas',
    abilities: xenasAbilities,
    icon: 'inv_achievement_dungeon_nexuspointxenas',
  },
  {
    key: 'wind',
    name: 'Windrunner Spire',
    abilities: windAbilities,
    icon: 'inv_achievement_dungeon_windrunnerspire',
  },
  {
    key: 'aa',
    name: "Algeth'ar Academy",
    abilities: aaAbilities,
    icon: 'achievement_dungeon_dragonacademy',
  },
  {
    key: 'pit',
    name: 'Pit of Saron',
    abilities: pitAbilities,
    icon: 'achievement_dungeon_icecrown_pitofsaron',
  },
  {
    key: 'seat',
    name: 'Seat of the Triumvirate',
    abilities: seatAbilities,
    icon: 'achievement_dungeon_argusdungeon',
  },
  {
    key: 'sky',
    name: 'Skyreach',
    abilities: skyAbilities,
    icon: 'achievement_dungeon_arakkoaspires',
  },
]

dungeonsUncompiled.push({
  key: 'all_dungeons',
  name: 'All dungeons',
  abilities: dungeonsUncompiled.flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

export default async () => ({
  data: dungeonsUncompiled,
})
