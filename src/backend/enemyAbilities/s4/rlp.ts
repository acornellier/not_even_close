import { getEnemySpellS4 } from '../grimoire'

const tectonicSlam = getEnemySpellS4(372735, {
  trashAbility: true,
  avoidable: true,
  cooldown: 10,
  outrange: 40,
})

const livingBomb = getEnemySpellS4(373694, {
  damage: 182376,
  trashAbility: true,
  cooldown: 17,
  notes: 'Only the final hit.',
})

const infernoTrash = getEnemySpellS4(373692, {
  name: 'Inferno (Trash)',
  trashAbility: true,
  cooldown: 19,
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
})

const rollingThunder = getEnemySpellS4(392642, {
  trashAbility: true,
  notes: 'This does not include the ticking damage. Only the groupwide dispel damage.',
})

const inferno = getEnemySpellS4(384823, {
  name: 'Inferno (Boss)',
  cooldown: 35,
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
})

const lightningStorm = getEnemySpellS4(392486, {
  damage: 6 * getEnemySpellS4(392488).damage,
  trashAbility: true,
  periodic: true,
  cooldown: 28,
})

const flamespit = getEnemySpellS4(381607, {
  cooldown: 22,
  notes: 'Only the initial hit',
})

const interruptingCloudburst = getEnemySpellS4(381516, {
  cooldown: 19,
})

const infernocore = getEnemySpellS4(381862, {
  damage: flamespit.damage + 8 * 10943 + getEnemySpellS4(381864).damage,
  periodic: true,
  cooldown: 22,
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
