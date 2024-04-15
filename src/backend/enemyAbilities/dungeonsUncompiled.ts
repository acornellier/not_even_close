import { aaAbilities } from './s4/aa'
import { avAbilities } from './s4/av'
import { bhAbilities } from './s4/bh'
import { hoiAbilities } from './s4/hoi'
import { nelthAbilities } from './s4/nelth'
import { nokAbilities } from './s4/nok'
import { rlpSpells } from './s4/rlp'
import { uldAbilities } from './s4/uld'
import { adAbilities } from './s3/ad'
import { brhAbilities } from './s3/brh'
import { dhtAbilities } from './s3/dht'
import { dotiAbilites } from './s3/doti'
import { ebAbilities } from './s3/eb'
import { tottAbilities } from './s3/tott'
import { wcmAbilities } from './s3/wcm'
import type { Dungeon} from './enemies';
import { isSeason4 } from './enemies'

export const dungeonsUncompiled: Dungeon[] = [
  {
    key: 'aa',
    name: 'Algethar Academy',
    abilities: aaAbilities,
    icon: 'achievement_dungeon_dragonacademy',
  },
  {
    key: 'av',
    name: 'Azure Vault',
    abilities: avAbilities,
    icon: 'achievement_dungeon_arcanevaults',
  },
  {
    key: 'bh',
    name: 'Brackenhide Hollow',
    abilities: bhAbilities,
    icon: 'achievement_dungeon_brackenhidehollow',
  },
  {
    key: 'hoi',
    name: 'Halls of Infusion',
    abilities: hoiAbilities,
    icon: 'achievement_dungeon_hallsofinfusion',
  },
  {
    key: 'nelth',
    name: 'Neltharus',
    abilities: nelthAbilities,
    icon: 'achievement_dungeon_neltharus',
  },
  {
    key: 'nok',
    name: 'Nokhud Offensive',
    abilities: nokAbilities,
    icon: 'achievement_dungeon_centaurplains',
  },
  {
    key: 'rlp',
    name: 'Ruby Life Pools',
    abilities: rlpSpells,
    icon: 'achievement_dungeon_lifepools',
  },
  {
    key: 'uld',
    name: 'Uldaman',
    abilities: uldAbilities,
    icon: 'achievement_dungeon_uldaman',
  },
  {
    key: 'ad',
    name: "Atal'Dazar",
    abilities: adAbilities,
    icon: 'achievement_dungeon_ataldazar',
  },
  {
    key: 'brh',
    name: 'Black Rook Hold',
    abilities: brhAbilities,
    icon: 'achievement_dungeon_blackrookhold',
  },
  {
    key: 'dht',
    name: 'Darkheart Thicket',
    abilities: dhtAbilities,
    icon: 'achievement_dungeon_darkheartthicket',
  },
  {
    key: 'doti',
    name: 'Dawn of the Infinite',
    abilities: dotiAbilites,
    icon: 'achievement_dungeon_dawnoftheinfinite',
  },
  {
    key: 'eb',
    name: 'Everbloom',
    abilities: ebAbilities,
    icon: 'achievement_dungeon_everbloom',
  },
  {
    key: 'tott',
    name: 'Throne of the Tides',
    abilities: tottAbilities,
    icon: 'achievement_dungeon_throne-of-the-tides',
  },
  {
    key: 'wcm',
    name: 'Waycrest Manor',
    abilities: wcmAbilities,
    icon: 'achievement_dungeon_waycrestmannor',
  },
]

dungeonsUncompiled.push({
  key: 'all_s3',
  name: 'All dungeons',
  abilities: dungeonsUncompiled
    .filter(({ key }) => !isSeason4(key))
    .flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

dungeonsUncompiled.push({
  key: 'all_s4',
  name: 'All dungeons',
  abilities: dungeonsUncompiled
    .filter(({ key }) => isSeason4(key))
    .flatMap(({ abilities }) => abilities),
  icon: 'achievement_challengemode_arakkoaspires_gold',
})

export default async () => ({
  data: dungeonsUncompiled,
})
