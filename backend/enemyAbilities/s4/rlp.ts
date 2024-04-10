import { getEnemySpellS4 } from '../grimoire'

const tectonicSlam = getEnemySpellS4(372735, {
  trashAbility: true,
  avoidable: true,
  timeBetweenCasts: 10,
  counterplay: {
    outrange: 40,
  },
})

const livingBomb = getEnemySpellS4(373694, {
  baseDamage: 182376,
  trashAbility: true,
  timeBetweenCasts: 17,
  notes: 'Only the final hit.',
})

const infernoTrash = getEnemySpellS4(373692, {
  name: 'Inferno (Trash)',
  trashAbility: true,
  timeBetweenCasts: 19,
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
})

const rollingThunder = getEnemySpellS4(392642, {
  trashAbility: true,
  notes: 'This does not include the ticking damage. Only the groupwide dispel damage.',
})

const inferno = getEnemySpellS4(384823, {
  name: 'Inferno (Boss)',
  timeBetweenCasts: 35,
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
})

const lightningStorm = getEnemySpellS4(392486, {
  baseDamage: 6 * getEnemySpellS4(392488).baseDamage,
  trashAbility: true,
  periodic: true,
  timeBetweenCasts: 28,
})

const flamespit = getEnemySpellS4(381607, {
  timeBetweenCasts: 22,
  notes: 'Only the initial hit',
})

const interruptingCloudburst = getEnemySpellS4(381516, {
  timeBetweenCasts: 19,
})

const infernocore = getEnemySpellS4(381862, {
  baseDamage: flamespit.baseDamage + 8 * 10943 + getEnemySpellS4(381864).baseDamage,
  periodic: true,
  timeBetweenCasts: 22,
  notes: 'Initial Flamespit hit + ticking damage + final hit.',
})

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
