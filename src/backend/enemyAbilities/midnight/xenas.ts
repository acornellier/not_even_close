import { bossSpell, trashSpell } from '../grimoire.ts'

const holyBolt = trashSpell(1263892, {
  avoidable: true,
})

const eclipsingStep = bossSpell(1252875)

const brilliantDispersion = bossSpell(1255503)

export const xenasAbilities = [eclipsingStep, holyBolt, brilliantDispersion]
