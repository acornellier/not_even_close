import { EnemyAbility } from '../../dungeons'

const staticSurge: EnemyAbility = {
  name: 'Static Surge',
  id: 384014,
  icon: 'spell_nature_unrelentingstorm',
  baseDamage: 155019 * 3,
  aoe: true,
  periodic: true,
  timeBetweenCasts: 28,
}

const powerOverload: EnemyAbility = {
  name: 'Power Overload',
  id: 389179,
  icon: 'ability_thunderking_lightningwhip',
  baseDamage: 54713 * 6,
  aoe: true,
  periodic: true,
  timeBetweenCasts: 28,
}

const overpoweringCroak: EnemyAbility = {
  name: 'Overpowering Croak',
  id: 385187,
  icon: 'ability_vehicle_sonicshockwave',
  baseDamage: 131903 * 3,
  aoe: true,
  physical: true,
  periodic: true,
  timeBetweenCasts: 38,
}

const toxicEffluvia: EnemyAbility = {
  name: 'Toxic Effluvia',
  id: 385442,
  icon: 'ability_creature_poison_02',
  baseDamage: 109425 * 3,
  aoe: true,
  periodic: true,
  timeBetweenCasts: 26,
}

const tempestsFury: EnemyAbility = {
  name: "Tempest's Fury",
  id: 388424,
  icon: 'spell_druid_astralstorm',
  baseDamage: 373870,
  aoe: true,
}

const tempestsFury32: EnemyAbility = {
  ...tempestsFury,
  name: "Tempest's Fury @ 20 stacks",
  baseDamage: Math.round(tempestsFury.baseDamage * 1.2),
  notes: 'Assumes all 4 ads channel for 25 seconds each. More likely to be ~15 stacks.',
}

const lightningBlast: EnemyAbility = {
  name: 'Lightning Blast',
  id: 395690,
  icon: 'spell_nature_lightning',
  baseDamage: 218851,
  aoe: false,
  trashAbility: true,
  counterplay: {
    outrange: 40,
  },
}

const deepChill: EnemyAbility = {
  name: 'Deep Chill',
  id: 391634,
  icon: 'ability_mage_wintersgrasp',
  baseDamage: 291801,
  aoe: true,
  trashAbility: true,
}

const inundate: EnemyAbility = {
  name: 'Inundate',
  id: 388882,
  icon: 'spell_frost_frostbolt02',
  baseDamage: 328276,
  aoe: true,
  trashAbility: true,
  counterplay: {
    outrange: 40,
  },
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
