import { EnemyAbility } from '../../dungeons'

const staticSurge: EnemyAbility = {
  name: 'Static Surge',
  id: 384014,
  icon: 'spell_nature_unrelentingstorm',
  baseDamage: 155019 * 3,
  isAoe: true,
  notOneShot: true,
  timeBetweenCasts: 28,
}

const powerOverload: EnemyAbility = {
  name: 'Power Overload',
  id: 389179,
  icon: 'ability_thunderking_lightningwhip',
  baseDamage: 54713 * 6,
  isAoe: true,
  notOneShot: true,
  timeBetweenCasts: 28,
}

const overpoweringCroak: EnemyAbility = {
  name: 'Overpowering Croak',
  id: 385187,
  icon: 'ability_vehicle_sonicshockwave',
  baseDamage: 131903 * 3,
  isAoe: true,
  isPhysical: true,
  notOneShot: true,
  timeBetweenCasts: 38,
}

const toxicEffluvia: EnemyAbility = {
  name: 'Toxic Effluvia',
  id: 385442,
  icon: 'ability_creature_poison_02',
  baseDamage: 109425 * 3,
  isAoe: true,
  notOneShot: true,
  timeBetweenCasts: 26,
}

const tempestsFury: EnemyAbility = {
  name: "Tempest's Fury",
  id: 388424,
  icon: 'spell_druid_astralstorm',
  baseDamage: 373870,
  isAoe: true,
}

const tempestsFury32: EnemyAbility = {
  ...tempestsFury,
  name: "Tempest's Fury @ 32 stacks",
  baseDamage: Math.round(tempestsFury.baseDamage * 1.4),
}

const lightningBlast: EnemyAbility = {
  name: 'Lightning Blast',
  id: 395690,
  icon: 'spell_nature_lightning',
  baseDamage: 218851,
  isAoe: false,
  isTrashAbility: true,
}

const deepChill: EnemyAbility = {
  name: 'Deep Chill',
  id: 391634,
  icon: 'ability_mage_wintersgrasp',
  baseDamage: 291801,
  isAoe: true,
  isTrashAbility: true,
}

const inundate: EnemyAbility = {
  name: 'Inundate',
  id: 388882,
  icon: 'spell_frost_frostbolt02',
  baseDamage: 328276,
  isAoe: true,
  isTrashAbility: true,
}

export const hoiAbilities = [
  staticSurge,
  powerOverload,
  overpoweringCroak,
  toxicEffluvia,
  tempestsFury,
  tempestsFury32,
  lightningBlast,
  deepChill,
  inundate,
]
