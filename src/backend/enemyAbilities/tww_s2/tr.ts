import { bossSpell, trashSpell } from '../grimoire.ts'

const lightningBolt = trashSpell(430109, { avoidable: true })

const crashingThunder = bossSpell(1214326)

const arcingVoid = trashSpell(430805)

const crashReality = bossSpell(425113)

export const trAbilities = [lightningBolt, crashingThunder, arcingVoid, crashReality]
