import { bossSpell, trashSpell } from '../grimoire.ts'

const impale = trashSpell(427621)

const potShot = trashSpell(462859)

const thunderclap = trashSpell(448492)

const shieldSlam = trashSpell(448485, {
  tankOnly: true,
})

const lungingStrike = trashSpell(424426)

const heatWave = trashSpell(427897)

const fireballTaenerBoss = bossSpell(424421, {
  name: 'Fireball (Taener Boss)',
  avoidable: true,
})

const fireballTaenerTrash = trashSpell(424421, {
  name: 'Fireball (Taener Trash)',
  avoidable: true,
})

const divineJudgment = trashSpell(448515, { tankOnly: true })

const pierceArmor = bossSpell(424414, { tankOnly: true })

const sacredToll = trashSpell(448791)

const fireball = trashSpell(427469, {
  name: 'Fireball (conjuror)',
  avoidable: true,
})

const catigatorsShield = bossSpell(446649)

const holySmite = trashSpell(427357, { avoidable: true })

export const psfAbilities = [
  impale,
  potShot,
  thunderclap,
  shieldSlam,
  lungingStrike,
  heatWave,
  fireballTaenerBoss,
  fireballTaenerTrash,
  divineJudgment,
  pierceArmor,
  sacredToll,
  fireball,
  catigatorsShield,
  holySmite,
]
