import type { SpellOverrides } from './index.ts'

/** Murder Row */
export const murdOverrides: SpellOverrides = {
  1216538: { avoidable: true, reason: 'Explodes on death — move away from the corpse' },
  1258420: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1295455: { reason: 'Energy erupts under targeted players; not avoidable' },
  474234: {
    avoidable: true,
    ticks: 1,
    reason: 'Fel magic on the ground; only hits players standing in it. A single hit, not periodic',
  },
  474375: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1214355: { include: true, reason: 'Added by hand; not avoidable' },
}
