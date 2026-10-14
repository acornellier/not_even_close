import type { SpellOverrides } from './index.ts'

/** Temple of Sethraliss */
export const tosOverrides: SpellOverrides = {
  1291262: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  273225: { avoidable: true, reason: 'Arrows land at a target location, 4yd impact' },
  1293133: { avoidable: true, reason: 'Storm pool left under the caster — walk out' },
  1310683: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1291815: { avoidable: true, reason: 'Static field — only hits players standing within it' },
  267483: { avoidable: true, reason: 'Loose sparks only hit players they connect with' },
  1291598: { avoidable: true, reason: 'Lightning strikes at fixed locations, 5yd radius' },
  1300684: { exclude: true, reason: 'Removed by hand' },
  1302761: { avoidable: true, reason: 'Erupts within 20yd — move away from the guardian' },
  1288092: {
    splitBetween: 5,
    notes: 'Split between 5 players.',
    reason: 'Damage is split between the group',
  },
  1311808: { include: true, reason: 'Added by hand' },
  264763: { include: true, reason: 'Added by hand' },
  1311981: { exclude: true, reason: 'Removed by hand' },
  1302153: { exclude: true, reason: 'Removed by hand' },
  1311979: { exclude: true, reason: 'Removed by hand' },
  1303486: {
    separateDot: true,
    reason: 'The initial hit is the burst; the DoT is listed separately',
  },
  1296052: { exclude: true, reason: 'Removed by hand' },
  267027: { exclude: true, reason: 'Removed by hand' },
  1303596: { exclude: true, reason: 'Removed by hand' },
  1288428: { exclude: true, reason: 'Removed by hand' },
  1302826: { exclude: true, reason: 'Removed by hand' },
}
