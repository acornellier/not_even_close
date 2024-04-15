import type { EnemyAbility } from '../enemies'

export const soulBolt: EnemyAbility = {
  name: 'Soul Bolt',
  damage: 87889,
  aoe: false,
  trashAbility: true,
  icon: 'spell_shadow_painspike',
  wowheadLink: 'https://www.wowhead.com/spell=264024/soul-bolt',
}

export const jaggedNettles: EnemyAbility = {
  name: 'Jagged Nettles',
  damage: 98875,
  aoe: false,
  physical: true,
  icon: 'inv_misc_herb_gromsbloodleaf',
  wowheadLink: 'https://www.wowhead.com/spell=260741/jagged-nettles',
}

export const dreadEssence: EnemyAbility = {
  name: 'Dread Essence',
  damage: 96129,
  aoe: true,
  icon: 'ability_argus_soulburst',
  wowheadLink: 'https://www.wowhead.com/spell=266181/dread-essence',
}

export const rottenExpulsion: EnemyAbility = {
  name: 'Rotten Expulsion',
  damage: 105742,
  aoe: true,
  icon: 'ability_creature_disease_01',
  wowheadLink: 'https://www.wowhead.com/spell=264694/rotten-expulsion',
}

export const wcmAbilities = [soulBolt, jaggedNettles, rottenExpulsion, dreadEssence]
