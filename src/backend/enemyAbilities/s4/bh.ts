import { getEnemySpell } from '../grimoire'

const gashFrenzy = getEnemySpell(378020, { cooldown: 60 })

const earthBoltTrash = getEnemySpell(382249, {
  name: 'Earth Bolt (trash)',
  trashAbility: true,
  avoidable: true,
})

const witheredEruption = getEnemySpell(387264, {
  cooldown: 45,
})

const earthBolt = getEnemySpell(378155, {
  name: 'Earth Bolt (boss)',
  avoidable: true,
})

const stinkBreath = getEnemySpell(385186, {
  trashAbility: true,
  cooldown: 15,
  outrange: 10,
})

export const bhAbilities = [
  gashFrenzy,
  earthBolt,
  witheredEruption,
  earthBoltTrash,
  stinkBreath,
]
