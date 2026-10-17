import type { SpellOverrides } from './index.ts'

/** The Blinding Vale */
export const valeOverrides: SpellOverrides = {
  1237858: { avoidable: true, reason: 'Ruptured ground left behind by the strike' },
  1255205: { reason: 'Reported as not avoidable in a request (#17)' },
  1238063: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1234802: {
    avoidable: true,
    reason: 'Subsoil patch — only hits players standing within',
  },
  1235574: {
    avoidable: true,
    reason: 'Beam channelled on a seed; only hits players in the effect',
  },
  1235828: {
    avoidable: true,
    reason: 'Charred ground — only hits players standing within',
  },
  1239919: { avoidable: true, reason: 'Only damages players standing within the beams' },
  1242200: { avoidable: true, reason: 'Explodes on death — move away from the corpse' },
  1246751: { avoidable: true, reason: 'Beam; only hits players caught within it' },
  1237267: { exclude: true, reason: 'Removed by hand' },
  1241058: {
    initialHitOnly: true,
    ignoresArmor: true,
    notes: 'Initial hit only.',
    reason:
      'Only the initial hit is a burst to survive. Ignores armor: tanks mitigate it ~11pp more than others, in line with known armor-ignoring spells',
  },
  1247039: { exclude: true, reason: 'Removed by hand' },
  1238084: { exclude: true, reason: 'Removed by hand' },
  1263628: { exclude: true, reason: 'Removed by hand' },
  1301834: { avoidable: true, ticks: 1, reason: 'Avoidable, by hand; a single hit' },
  1238232: { avoidable: true, ticks: 1, reason: 'Avoidable, by hand; a single hit' },
  1303039: { exclude: true, reason: 'Removed by hand' },
  270503: { exclude: true, reason: 'Removed by hand' },
  1250100: { tankOnly: true, reason: 'Tank only, by hand' },
  1240257: {
    include: true,
    ignoresArmor: true,
    reason:
      'Added by hand. Ignores armor: tanks mitigate it ~11pp more than others, in line with known armor-ignoring spells',
  },
}
