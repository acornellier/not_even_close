import type { Dungeon } from './enemies'
import { ofAbilities } from './tww_s3/of.ts'
import { psfAbilities } from './tww_s3/psf.ts'
import { akAbilities } from './tww_s3/ak.ts'
import { dbAbilities } from './tww_s3/db.ts'
import { hoaAbilities } from './tww_s3/hoa.ts'
import { gmbtAbilities } from './tww_s3/gmbt.ts'
import { strtAbilities } from './tww_s3/strt.ts'
import { edaAbilities } from './tww_s3/edaAbilities.ts'

export const dungeonsUncompiled: Dungeon[] = [
  {
    key: 'ak',
    name: 'Ara-Kara',
    abilities: akAbilities,
    icon: 'inv_achievement_dungeon_arak-ara',
  },
  {
    key: 'db',
    name: 'Dawnbreaker',
    abilities: dbAbilities,
    icon: 'inv_achievement_dungeon_dawnbreaker',
  },
  {
    key: 'eda',
    name: "Eco-Dome Al'dani",
    abilities: edaAbilities,
    icon: 'inv_112_achievement_dungeon_ecodome',
  },
  {
    key: 'gmbt',
    name: "So'leah's Gambit",
    abilities: gmbtAbilities,
    icon: 'achievement_dungeon_brokerdungeon',
  },
  {
    key: 'hoa',
    name: 'Halls of Atonement',
    abilities: hoaAbilities,
    icon: 'achievement_dungeon_hallsofattonement',
  },
  {
    name: 'Operation: Floodgate',
    key: 'of',
    icon: 'inv_achievement_dungeon_waterworks',
    abilities: ofAbilities,
  },
  {
    name: 'Priory',
    key: 'psf',
    icon: 'inv_achievement_dungeon_prioryofthesacredflame',
    abilities: psfAbilities,
  },
  {
    name: 'Streets of Wonder',
    key: 'strt',
    abilities: strtAbilities,
    icon: 'ability_brokerjazzband_trumpet',
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
