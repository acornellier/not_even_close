import type { SpellOverrides } from './index.ts'

/** The Blinding Vale */
export const valeOverrides: SpellOverrides = {
  1237858: { avoidable: true, reason: 'Ruptured ground left behind by the strike' },
  1255205: { avoidable: true, reason: "Roots summoned at players' locations" },
  1238063: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1234802: { avoidable: true, reason: 'Subsoil patch — only hits players standing within' },
  1235574: { avoidable: true, reason: 'Beam channelled on a seed; only hits players in the effect' },
  1235828: { avoidable: true, reason: 'Charred ground — only hits players standing within' },
  1239919: { avoidable: true, reason: 'Only damages players standing within the beams' },
  1242200: { avoidable: true, reason: 'Explodes on death — move away from the corpse' },
  1246751: { avoidable: true, reason: 'Beam; only hits players caught within it' },
}
