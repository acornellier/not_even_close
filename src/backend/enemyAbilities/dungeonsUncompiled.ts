import type { Dungeon } from './enemies'
import { murdAbilities } from './midnight_s2/murd.ts'
import { naloAbilities } from './midnight_s2/nalo.ts'
import { valeAbilities } from './midnight_s2/vale.ts'
import { voidAbilities } from './midnight_s2/void.ts'
import { fangAbilities } from './midnight_s2/fang.ts'
import { rlpAbilities } from './midnight_s2/rlp.ts'
import { tosAbilities } from './midnight_s2/tos.ts'
import { krAbilities } from './midnight_s2/kr.ts'

export const dungeonsUncompiled = (
  [
    {
      key: 'murd',
      name: 'Murder Row',
      abilities: murdAbilities,
      icon: 'inv_achievement_dungeon_murderrow',
    },
    {
      key: 'nalo',
      name: 'Den of Nalorakk',
      abilities: naloAbilities,
      icon: 'inv_achievement_dungeon_proveyourworth',
    },
    {
      key: 'vale',
      name: 'The Blinding Vale',
      abilities: valeAbilities,
      icon: 'inv_achievement_dungeon_lightbloom',
    },
    {
      key: 'void',
      name: 'Voidscar Arena',
      abilities: voidAbilities,
      icon: 'inv_achievement_dungeon_voidscararena',
    },
    {
      key: 'fang',
      name: 'Altar of Fangs',
      abilities: fangAbilities,
      icon: 'inv_achievement_dungeon_altaroffangs',
    },
    {
      key: 'rlp',
      name: 'Ruby Life Pools',
      abilities: rlpAbilities,
      icon: 'achievement_dungeon_lifepools',
    },
    {
      key: 'tos',
      name: 'Temple of Sethraliss',
      abilities: tosAbilities,
      icon: 'achievement_dungeon_templeofsethraliss',
    },
    {
      key: 'kr',
      name: "Kings' Rest",
      abilities: krAbilities,
      icon: 'achievement_dungeon_kingsrest',
    },
  ] as Dungeon[]
).sort((a, b) => a.key.localeCompare(b.key))

dungeonsUncompiled.push({
  key: 'all_dungeons',
  name: 'All dungeons',
  abilities: dungeonsUncompiled.flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

export default async () => ({
  data: dungeonsUncompiled,
})
