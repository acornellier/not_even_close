import { bossSpell, trashSpell } from '../grimoire.ts'

const impoundContraband = bossSpell(345770)

const energizedSlam = trashSpell(1240811)

// const purificationProtocol = bossSpell(349954)

const junkMail = trashSpell(347903)

const mailShoot = trashSpell(347822)

const moneyOrder = bossSpell(346967, (spell) => ({
  name: `${spell.name} (split 5x)`,
  damage: spell.damage / 5,
}))

export const strtAbilities = [
  impoundContraband,
  energizedSlam,
  // purificationProtocol,
  junkMail,
  mailShoot,
  moneyOrder,
]
