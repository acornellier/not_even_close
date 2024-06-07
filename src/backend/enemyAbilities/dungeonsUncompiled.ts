import type { Dungeon } from './enemies'
import { cotAbilities } from './tww_s1/cot.ts'

export const dungeonsUncompiled: Dungeon[] = [
  {
    key: 'cot',
    name: 'City of Threads',
    abilities: cotAbilities,
    icon: 'inv_achievement_dungeon_cityofthreads',
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
