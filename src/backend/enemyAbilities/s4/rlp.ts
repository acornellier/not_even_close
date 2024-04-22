import { getEnemySpell } from '../grimoire'

const tectonicSlam = getEnemySpell(372735, {
  trashAbility: true,
  avoidable: true,
  cooldown: 10,
  outrange: 40,
})

const livingBomb = getEnemySpell(373694, {
  damage: 182376,
  trashAbility: true,
  cooldown: 17,
  notes: 'Only the final hit.',
})

const infernoTrash = getEnemySpell(373692, {
  name: 'Inferno (Trash)',
  trashAbility: true,
  cooldown: 19,
  combatDrop: 'cancel',
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
})

const rollingThunder = getEnemySpell(392642, {
  trashAbility: true,
  notes: 'This does not include the ticking damage. Only the groupwide dispel damage.',
})

const inferno = getEnemySpell(384823, {
  name: 'Inferno (Boss)',
  cooldown: 35,
  notes: 'This does not include the ticking damage. Only the initial groupwide damage.',
})

const lightningStorm = getEnemySpell(392486, {
  damage: 6 * getEnemySpell(392488).damage,
  trashAbility: true,
  periodic: true,
  cooldown: 28,
})

const flamespit = getEnemySpell(381607, {
  cooldown: 22,
  notes: 'Only the initial hit',
})

const interruptingCloudburst = getEnemySpell(381516, {
  cooldown: 19,
})

const infernocore = getEnemySpell(381862, {
  damage: flamespit.damage + 8 * 10943 + getEnemySpell(381864).damage,
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
