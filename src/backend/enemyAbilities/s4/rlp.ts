import { getEnemySpell } from '../grimoire'

const frigidShard = getEnemySpell(372808, {
  tankOnly: true,
})

const chillstorm = getEnemySpell(383925, {
  name: 'Chillstorm',
  damage: getEnemySpell(397077).damage + getEnemySpell(383925).damage,
  aoe: true,
  cooldown: 23,
  notes: '1 tick + final hit',
})

const tectonicSlam = getEnemySpell(372735, {
  trashAbility: true,
  avoidable: true,
  cooldown: 10,
  outrange: 40,
})

const livingBomb = getEnemySpell(373694, {
  damage: 78225 + 195564,
  aoe: true,
  aoeMultiplier: 0.714,
  trashAbility: true,
  cooldown: 17,
  notes: '1 tick + final hit.',
})

const infernoTrash = getEnemySpell(373692, {
  name: 'Inferno (Trash)',
  trashAbility: true,
  cooldown: 19,
  combatDrop: 'cancel',
  notes: 'Only the initial hit.',
})

const rollingThunder = getEnemySpell(392642, {
  trashAbility: true,
  notes: 'Only the initial hit',
})

const inferno = getEnemySpell(384823, {
  name: 'Inferno (Boss)',
  cooldown: 35,
  notes: 'Only the initial hit.',
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
  frigidShard,
  chillstorm,
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
