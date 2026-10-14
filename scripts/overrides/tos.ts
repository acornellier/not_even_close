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
  1300684: { avoidable: true, reason: 'Hex mire — only affects players standing in it' },
  1302761: { avoidable: true, reason: 'Erupts within 20yd — move away from the guardian' },
}
