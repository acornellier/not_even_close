import type { SpellOverrides } from './index.ts'

/** Voidscar Arena */
export const voidOverrides: SpellOverrides = {
  1228176: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1222103: { avoidable: true, reason: 'Dashes through a line — sidestep the path' },
  1264188: { avoidable: true, reason: 'Singularities pull players in; stay out of range' },
  1300372: { avoidable: true, reason: "Comets land at players' locations, 8yd impact" },
}
