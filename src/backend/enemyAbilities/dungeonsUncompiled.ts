import type { Dungeon } from './enemies'
import { cotAbilities } from './tww_s1/cot.ts'
import { gbAbilities } from './tww_s1/gb.ts'
import { akAbilities } from './tww_s1/ak.ts'
import { motAbilities } from './tww_s1/mot.ts'
import { nwAbilities } from './tww_s1/nw.ts'

export const dungeonsUncompiled: Dungeon[] = [
  {
    key: 'ak',
    name: 'Ara-Kara',
    abilities: akAbilities,
    icon: 'inv_achievement_dungeon_arak-ara',
  },
  {
    key: 'cot',
    name: 'City of Threads',
    abilities: cotAbilities,
    icon: 'inv_achievement_dungeon_cityofthreads',
  },
  {
    key: 'gb',
    name: 'Grim Batol',
    abilities: gbAbilities,
    icon: 'achievement_dungeon_grimbatol',
  },
  {
    key: 'mot',
    name: 'Mists of Tirna-Scithe',
    abilities: motAbilities,
    icon: 'achievement_dungeon_mistsoftirnascithe',
  },
  {
    key: 'nw',
    name: 'Necrotic Wake',
    abilities: nwAbilities,
    icon: 'achievement_dungeon_theneroticwake',
  },
]

dungeonsUncompiled.push({
  key: 'all_tww_s1',
  name: 'All dungeons',
  abilities: dungeonsUncompiled.flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

export default async () => ({
  data: dungeonsUncompiled,
})
