import { CharacterStats, EnemyAbilityDetails } from './simTypes'
import { Ability } from '../ability'
import { dampenHarm } from '../classAbilities/monk'
import { armorToPhysicalDr } from '../stats'

export function getDamageReduction(
  characterStats: CharacterStats,
  abilities: Ability[],
  customDrs: number[],
  enemyAbilityDetails: EnemyAbilityDetails,
  startingHealth: number,
  damageTaken: number
) {
  let inverseDr = 1 - characterStats.versatility / 2

  if (enemyAbilityDetails.aoe) {
    inverseDr *= 1 - characterStats.avoidance
  }

  if (enemyAbilityDetails.physical && !enemyAbilityDetails.ignoresArmor) {
    inverseDr *= 1 - armorToPhysicalDr(characterStats.armor)
  }

  for (const ability of abilities) {
    let dr = ability.dr
    if (
      (ability.drType === 'magic' && enemyAbilityDetails.physical) ||
      (ability.drType === 'physical' && !enemyAbilityDetails.physical)
    ) {
      dr = 0
    }

    if (dr && ability.aoeDr && enemyAbilityDetails.aoe) {
      inverseDr *= 1 - Math.max(dr, ability.aoeDr)
    } else if (dr) {
      inverseDr *= 1 - dr
    } else if (ability.aoeDr && enemyAbilityDetails.aoe) {
      inverseDr *= 1 - ability.aoeDr
    } else if (ability.spellId === dampenHarm.spellId) {
      const dampenDr = 0.2 + (damageTaken / startingHealth) * 0.3
      inverseDr *= 1 - Math.min(dampenDr, 0.5)
    }
  }

  for (const dr of customDrs) {
    inverseDr *= 1 - dr * 0.01
  }

  return 1 - inverseDr
}
