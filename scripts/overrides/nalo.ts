import type { SpellOverrides } from './index.ts'

/** Den of Nalorakk */
export const naloOverrides: SpellOverrides = {
  1241214: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1234846: { avoidable: true, reason: 'Noxious cloud from Rotten Mushrooms — stand clear' },
  1235405: { avoidable: true, reason: 'Bones litter the ground; damage only while standing on them' },
  1235635: { avoidable: true, reason: 'Squalls hit within 4yd of impact and then wander' },
  1246687: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1247366: { avoidable: true, reason: "Breaks earth at target players' locations" },
  1242887: { reason: 'Marks players, then strikes the marked position 4s later; not avoidable' },
  1243408: { reason: 'Charging echo hits the first target in its path; not avoidable' },
  1234681: {
    initialHitOnly: true,
    ignoresArmor: true,
    notes: 'Initial hit only.',
    reason: 'Only the roar is a burst to survive; tooltip says it ignores armor',
  },
  1235125: { exclude: true, reason: 'Same as Ravenous Bellow' },
  1241464: { exclude: true, reason: 'Removed by hand' },
  1262253: { avoidable: true, reason: 'Avoidable, by hand' },
  1263597: { exclude: true, reason: 'Never hit anyone in the logs; rated lethal by mistake' },
  1297793: { exclude: true, reason: 'Removed by hand' },
}
