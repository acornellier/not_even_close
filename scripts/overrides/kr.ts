import type { SpellOverrides } from './index.ts'

/** Kings' Rest */
export const krOverrides: SpellOverrides = {
  1294815: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1310758: { avoidable: true, reason: 'Hits within 4yd of the impact point' },
  270928: { avoidable: true, reason: 'Whirls toward a player — move away from it' },
  1294972: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1298104: { avoidable: true, reason: 'Hits within 4yd of the impact point' },
  1295125: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  266191: { avoidable: true, reason: 'Whirl hits within 10yd, then throws axes — stay out' },
  267105: { avoidable: true, reason: 'Water gouts hit within 3yd of the totem' },
  1303374: { exclude: true, reason: 'Removed by hand' },
  1302945: {
    initialHitOnly: true,
    notes: 'Initial hit only.',
    reason: 'Only the impact is a burst to survive; not dodgeable',
  },
  270503: { exclude: true, reason: 'Removed by hand' },
  1303039: { exclude: true, reason: 'Removed by hand' },
  265781: { exclude: true, reason: 'Replaced by the periodic gust, 1311988' },
  1311988: {
    include: true,
    ticks: 6,
    reason: 'The gust itself: ticks every 1 sec for 5 sec, 6 ticks',
  },
  1303267: {
    initialHitOnly: true,
    notes: 'Initial hit only.',
    reason: 'Only the initial hit is a burst to survive',
  },
  1310761: {
    include: true,
    ignoresArmor: true,
    splitBetween: 5,
    notes: 'Split between 5 players.',
    reason: 'Damage is split among players within 7yd of impact; assumes the whole group soaks',
  },
  1306056: { include: true, reason: 'Added by hand' },
  1297970: {
    avoidable: true,
    ignoresArmor: true,
    reason: 'Drains blood — armor does not apply; requested avoidable (#19)',
  },
}
