import type { SpellOverrides } from './index.ts'

/** Voidscar Arena */
export const voidOverrides: SpellOverrides = {
  1228176: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1222103: {
    avoidable: true,
    separateDot: true,
    reason: 'Dashes through a line — sidestep the path. Hit and DoT listed separately',
  },
  1264188: { avoidable: true, reason: 'Singularities pull players in; stay out of range' },
  1300372: { avoidable: true, reason: "Comets land at players' locations, 8yd impact" },
  1300262: { exclude: true, reason: 'Not a real Dark Bloom; 1300259 is the one players take' },
  1262497: { ignoresArmor: true, reason: 'Ignores armor, by hand' },
  1250695: { ticks: 4, reason: 'Ticks 4 times, by hand' },
  1239855: {
    splitBetween: 5,
    notes: 'Split between 5 players.',
    reason: 'Damage is split between the group',
  },
  1299913: {
    include: true,
    initialHitOnly: true,
    notes: 'Initial hit only.',
    reason: 'Added by hand; only the initial hit is a burst to survive',
  },
  1299273: { include: true, ticks: 5, reason: 'Added by hand; ticks 5 times' },
}
