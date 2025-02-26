import { bossSpell, trashSpell } from '../grimoire.ts'

const lightningBolt = trashSpell(430109, { avoidable: true })

const crashReality = bossSpell(425113)

export const trAbilities = [lightningBolt, crashReality]
