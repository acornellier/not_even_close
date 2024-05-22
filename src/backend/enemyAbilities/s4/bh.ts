import { getEnemySpell } from '../grimoire'

const gashFrenzy = getEnemySpell(378020, { cooldown: 60 })

const earthBolt = getEnemySpell(378155, { avoidable: true })

const witheredEruption = getEnemySpell(387264, {
  cooldown: 45,
})

const stinkBreath = getEnemySpell(385186, {
  trashAbility: true,
  cooldown: 15,
  outrange: 10,
})

export const bhAbilities = [gashFrenzy, earthBolt, witheredEruption, stinkBreath]
