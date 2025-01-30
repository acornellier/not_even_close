import { bossSpell, trashSpell } from '../grimoire.ts'

const chargedShield = trashSpell(262066)

const staticPulse = bossSpell(262347)

const rockLance = trashSpell(1215934, { avoidable: true })

const resonantQuake = bossSpell(471894)

const homingMissile = bossSpell(260838)

const drillSmash = bossSpell(260202)

export const tmAbilities = [
  chargedShield,
  staticPulse,
  rockLance,
  resonantQuake,
  homingMissile,
  drillSmash,
]
