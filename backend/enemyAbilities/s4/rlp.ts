import { EnemyAbility } from '../../dungeons'

const tectonicSlam: EnemyAbility = {
  name: 'Tectonic Slam',
  id: 372735,
  icon: 'inv_misc_volatileearth',
  baseDamage: 255326,
  isAoe: true,
  isTrashAbility: true,
  avoidable: true,
  timeBetweenCasts: 10,
  counterplay: {
    outrange: 40,
  },
}

const livingBomb: EnemyAbility = {
  name: 'Living Bomb',
  id: 373693,
  icon: 'inv_summerfest_firespirit',
  baseDamage: 182376,
  isAoe: true,
  isTrashAbility: true,
  timeBetweenCasts: 17,
}

const infernoTrash: EnemyAbility = {
  name: 'Inferno (Trash)',
  id: 373692,
  icon: 'ability_warlock_inferno',
  baseDamage: 218851,
  isAoe: true,
  isTrashAbility: true,
  timeBetweenCasts: 19,
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
}

const rollingThunder: EnemyAbility = {
  name: 'Rolling Thunder',
  id: 392640,
  icon: 'spell_nature_lightningoverload',
  baseDamage: 182376,
  isAoe: true,
  isTrashAbility: true,
  notes: 'This does not include the ticking damage. Only the groupwide dispel damage.',
}

const inferno: EnemyAbility = {
  name: 'Inferno (Boss)',
  id: 384823,
  icon: 'ability_warlock_inferno',
  baseDamage: 291801,
  isAoe: true,
  timeBetweenCasts: 35,
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
}

const lightningStorm: EnemyAbility = {
  name: 'Lightning Storm',
  id: 392486,
  icon: 'spell_shaman_thunderstorm',
  baseDamage: 6 * 91188,
  isAoe: true,
  isTrashAbility: true,
  periodicDamage: true,
  timeBetweenCasts: 28,
}

const flamespit: EnemyAbility = {
  name: 'Flamespit',
  id: 381602,
  icon: 'spell_fire_firebolt',
  baseDamage: 182376,
  isAoe: false,
  timeBetweenCasts: 22,
  notes: 'Only the initial hit',
}

const interruptingCloudburst: EnemyAbility = {
  name: 'Interrupting Cloudburst',
  id: 381516,
  icon: 'spell_nature_cyclone',
  baseDamage: 182376,
  isAoe: true,
  timeBetweenCasts: 19,
}

const infernocore: EnemyAbility = {
  name: 'Infernocore',
  id: 381862,
  icon: 'ability_mage_livingbomb',
  baseDamage: 182376 + 8 * 10943 + 118544,
  isAoe: false,
  periodicDamage: true,
  timeBetweenCasts: 22,
  notes:
    'Does not include the initial Flamespit hit. Only the initial ticking damage and final hit.',
}

export const rlpSpells = [
  tectonicSlam,
  livingBomb,
  infernoTrash,
  rollingThunder,
  inferno,
  lightningStorm,
  flamespit,
  interruptingCloudburst,
  infernocore,
]
