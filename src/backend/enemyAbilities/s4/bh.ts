import { getEnemySpellS4 } from '../grimoire'

const gashFrenzy = getEnemySpellS4(378020, { cooldown: 60 })

const earthBolt = getEnemySpellS4(378155, { avoidable: true })

const witheredEruption = getEnemySpellS4(387264, { cooldown: 45 })

const stinkBreath = getEnemySpellS4(385186, {
  trashAbility: true,
  cooldown: 15,
})

export const bhAbilities = [gashFrenzy, earthBolt, witheredEruption, stinkBreath]
