import type { SpellOverrides } from './index.ts'

/** Den of Nalorakk */
export const naloOverrides: SpellOverrides = {
  1241214: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1234846: { avoidable: true, reason: 'Noxious cloud from Rotten Mushrooms — stand clear' },
  1235405: { avoidable: true, reason: 'Bones litter the ground; damage only while standing on them' },
  1235635: { avoidable: true, reason: 'Squalls hit within 4yd of impact and then wander' },
  1246687: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1247366: { avoidable: true, reason: "Breaks earth at target players' locations" },
  1242887: { avoidable: true, reason: 'Marks players, then strikes the marked position 4s later' },
  1243408: { avoidable: true, reason: 'Charging echo hits the first target in its path' },
}
