import type { Dungeon } from './enemies'
import { cotAbilities } from './tww_s1/cot.ts'
import { gbAbilities } from './tww_s1/gb.ts'

export const dungeonsUncompiled: Dungeon[] = [
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
