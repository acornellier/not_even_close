import type { Dungeon } from './enemies'
import { cmAbilities } from './tww_s2/cm.ts'
import { dcAbilities } from './tww_s2/dc.ts'
import { mwAbilities } from './tww_s2/mw.ts'
import { ofAbilities } from './tww_s2/of.ts'
import { psfAbilities } from './tww_s2/psf.ts'
import { tmAbilities } from './tww_s2/tm.ts'
import { trAbilities } from './tww_s2/tr.ts'
import { topAbilities } from './tww_s2/top.ts'

export const dungeonsUncompiled: Dungeon[] = [
  {
    key: 'cm',
    name: 'Cinderbrew Meadery',
    icon: 'inv_achievement_dungeon_cinderbrewmeadery',
    abilities: cmAbilities,
  },
  {
    name: 'Darkflame Crest',
    key: 'dc',
    icon: 'inv_achievement_dungeon_darkflamecleft',
    abilities: dcAbilities,
  },
  {
    name: 'Mechagon',
    key: 'mw',
    icon: 'achievement_boss_mechagon',
    abilities: mwAbilities,
  },
  {
    name: 'The Motherlode',
    key: 'tm',
    icon: 'achievement_dungeon_kezan',
    abilities: tmAbilities,
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
    name: 'The Rookery',
    key: 'tr',
    icon: 'inv_achievement_dungeon_rookery',
    abilities: trAbilities,
  },
  {
    name: 'Theater of Pain',
    key: 'top',
    icon: 'achievement_dungeon_theatreofpain',
    abilities: topAbilities,
  },
]

dungeonsUncompiled.push({
  key: 'all_tww_s2',
  name: 'All dungeons',
  abilities: dungeonsUncompiled.flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

export default async () => ({
  data: dungeonsUncompiled,
})
