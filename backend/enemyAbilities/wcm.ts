import { EnemyAbility } from '../dungeons'

export const soulBolt: EnemyAbility = {
  name: 'Soul Bolt',
  dungeon: 'Waycrest Manor',
  baseDamage: 87889,
  isAoe: false,
  isTrashAbility: true,
  iconName: 'spell_shadow_painspike',
  wowheadLink: 'https://www.wowhead.com/spell=264024/soul-bolt',
}

export const dreadEssence: EnemyAbility = {
  name: 'Dread Essence',
  boss: 'Gorak Tul',
  dungeon: 'Waycrest Manor',
  baseDamage: 96129,
  isAoe: true,
  iconName: 'ability_argus_soulburst',
  wowheadLink: 'https://www.wowhead.com/spell=266181/dread-essence',
}

export const rottenExpulsion: EnemyAbility = {
  name: 'Rotten Expulsion',
  dungeon: 'Waycrest Manor',
  baseDamage: 105742,
  isAoe: true,
  iconName: 'ability_creature_disease_01',
  wowheadLink: 'https://www.wowhead.com/spell=264694/rotten-expulsion',
}

export const wcmAbilities = [soulBolt, rottenExpulsion, dreadEssence]
