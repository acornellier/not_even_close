import type { SpellOverrides } from './index.ts'

/** Altar of Fangs */
export const fangOverrides: SpellOverrides = {
  1306669: { exclude: true, reason: 'Removed by hand' },
  1307269: {
    initialHitOnly: true,
    notes: 'Initial hit only.',
    reason: 'Only the first shot is a burst to survive',
  },
  1294557: { exclude: true, reason: 'Removed by hand' },
  1294859: {
    include: true,
    ignoresArmor: true,
    ticks: 6,
    reason: 'Added by hand; 6 ticks (tooltip says 5 sec, which undercounts), ignores armor',
  },
  1308518: { exclude: true, reason: 'Removed by hand' },
  1294958: { exclude: true, reason: 'Removed by hand' },
  1307571: { exclude: true, reason: 'Removed by hand' },
  1306345: { reason: 'Chunks are meant to be caught — not something to dodge' },
  1301508: {
    initialHitOnly: true,
    notes: 'Initial hit only.',
    reason: 'Axe is aimed at a player, so not dodgeable; the bleed is healed through',
  },
  1307700: { exclude: true, reason: 'Stacking DoT from uncaught chunks, not a burst' },
  1299189: { exclude: true, reason: 'Removed by hand' },
  1310974: { exclude: true, reason: 'Damage/speed debuff, not damage taken' },
}
