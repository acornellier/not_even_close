/**
 * Hand-made calls that the logs and spell data can't produce, keyed by spell id.
 *
 * `writeAbilities` merges these into every generated declaration, so they survive `--refresh`
 * and regeneration. Anything hand-edited directly in an ability file does NOT survive — put it
 * here instead.
 *
 * The avoidable flags below are a first pass made by reading Wowhead tooltips (see
 * `yarn descriptions`). The rules applied were:
 *   - ground you can walk out of  ("players standing within", "players within it")
 *   - impacts at a targeted spot  ("at players' locations", "within N yards of the impact")
 *   - frontal cones and paths     ("in front of", "caught in its path")
 *   - Bolts, which are single-target interruptible casts
 *
 * Deliberately NOT marked: anything hitting "all players", tank melee and busters, and DoTs
 * applied directly to a player — none of those are dodged by moving.
 */

export interface SpellOverride {
  avoidable?: boolean
  /** Leave the spell out of the ability file entirely; `yarn write` removes it if present. */
  exclude?: boolean
  /** Use only the direct hit, dropping the DoT that follows it. */
  initialHitOnly?: boolean
  /** Write the spell even when the scraper doesn't rate it lethal. */
  include?: boolean
  /** Tick count, for DoTs grimoire has no periodic data for. */
  ticks?: number
  ignoresArmor?: boolean
  notes?: string
  /** Why this call was made. Kept so the next person can disagree with it. */
  reason: string
}

export const spellOverrides: Record<number, SpellOverride> = {
  // ---- Murder Row ----------------------------------------------------------------------
  1216538: { avoidable: true, reason: 'Explodes on death — move away from the corpse' },
  1258420: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1295455: { avoidable: true, reason: 'Energy erupts under targeted players' },
  474234: { avoidable: true, reason: 'Fel magic on the ground; only hits players standing in it' },
  474375: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },

  // ---- Den of Nalorakk -----------------------------------------------------------------
  1241214: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1234846: { avoidable: true, reason: 'Noxious cloud from Rotten Mushrooms — stand clear' },
  1235405: { avoidable: true, reason: 'Bones litter the ground; damage only while standing on them' },
  1235635: { avoidable: true, reason: 'Squalls hit within 4yd of impact and then wander' },
  1246687: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1247366: { avoidable: true, reason: "Breaks earth at target players' locations" },
  1242887: { avoidable: true, reason: 'Marks players, then strikes the marked position 4s later' },
  1243408: { avoidable: true, reason: 'Charging echo hits the first target in its path' },

  // ---- The Blinding Vale ---------------------------------------------------------------
  1237858: { avoidable: true, reason: 'Ruptured ground left behind by the strike' },
  1255205: { avoidable: true, reason: "Roots summoned at players' locations" },
  1238063: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1234802: { avoidable: true, reason: 'Subsoil patch — only hits players standing within' },
  1235574: { avoidable: true, reason: 'Beam channelled on a seed; only hits players in the effect' },
  1235828: { avoidable: true, reason: 'Charred ground — only hits players standing within' },
  1239919: { avoidable: true, reason: 'Only damages players standing within the beams' },
  1242200: { avoidable: true, reason: 'Explodes on death — move away from the corpse' },
  1246751: { avoidable: true, reason: 'Beam; only hits players caught within it' },

  // ---- Voidscar Arena ------------------------------------------------------------------
  1228176: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1222103: { avoidable: true, reason: 'Dashes through a line — sidestep the path' },
  1264188: { avoidable: true, reason: 'Singularities pull players in; stay out of range' },
  1300372: { avoidable: true, reason: "Comets land at players' locations, 8yd impact" },

  // ---- Altar of Fangs ------------------------------------------------------------------
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

  // ---- Ruby Life Pools -----------------------------------------------------------------
  371984: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  373693: { avoidable: true, reason: 'Explodes on expiry within 6yd — spread out' },
  1307372: { avoidable: true, reason: 'Leaves a fire pool on death; only hits players within it' },
  384194: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  372820: { avoidable: true, reason: 'Scorched ground — only hits players within the flames' },
  381518: { avoidable: true, reason: 'Localised hurricane — move out of it' },
  384773: { avoidable: true, reason: 'Burning embers on the ground; only hits players within' },

  // ---- Temple of Sethraliss ------------------------------------------------------------
  1291262: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  273225: { avoidable: true, reason: 'Arrows land at a target location, 4yd impact' },
  1293133: { avoidable: true, reason: 'Storm pool left under the caster — walk out' },
  1310683: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1291815: { avoidable: true, reason: 'Static field — only hits players standing within it' },
  267483: { avoidable: true, reason: 'Loose sparks only hit players they connect with' },
  1291598: { avoidable: true, reason: 'Lightning strikes at fixed locations, 5yd radius' },
  1300684: { avoidable: true, reason: 'Hex mire — only affects players standing in it' },
  1302761: { avoidable: true, reason: 'Erupts within 20yd — move away from the guardian' },

  // ---- Kings' Rest ---------------------------------------------------------------------
  1294815: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1310758: { avoidable: true, reason: 'Hits within 4yd of the impact point' },
  270928: { avoidable: true, reason: 'Whirls toward a player — move away from it' },
  1294972: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  1298104: { avoidable: true, reason: 'Hits within 4yd of the impact point' },
  1295125: { avoidable: true, reason: 'Bolt: single-target interruptible cast' },
  266191: { avoidable: true, reason: 'Whirl hits within 10yd, then throws axes — stay out' },
  267105: { avoidable: true, reason: 'Water gouts hit within 3yd of the totem' },
  1303374: { avoidable: true, reason: 'Frontal cone — hits enemies in front of the caster' },
  1302945: { avoidable: true, reason: 'Spears drop from the ceiling, 7yd impact' },
}
