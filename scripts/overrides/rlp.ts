import type { SpellOverrides } from './index.ts'

/** Ruby Life Pools */
export const rlpOverrides: SpellOverrides = {
  371984: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  373693: { exclude: true, reason: 'Removed by hand' },
  1307372: {
    avoidable: true,
    reason: 'Leaves a fire pool on death; only hits players within it',
  },
  384194: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  372820: {
    avoidable: true,
    reason: 'Scorched ground — only hits players within the flames',
  },
  381518: { avoidable: true, reason: 'Localised hurricane — move out of it' },
  384773: {
    avoidable: true,
    reason: 'Burning embers on the ground; only hits players within',
  },
  1307205: {
    separateDot: true,
    reason: 'The initial hit is the burst; the DoT is listed separately',
  },
  373692: {
    separateDot: true,
    reason: 'The initial hit is the burst; the DoT is listed separately',
  },
  384823: {
    boss: true,
    separateDot: true,
    reason:
      'Cast by the Blazebound Firestorm boss; the scraper took it for trash. The initial hit is the burst; the DoT is listed separately',
  },
  1309540: { include: true, reason: 'Added by hand' },
}
