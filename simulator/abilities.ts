import { State } from './characterStats'
import { talentNames } from './talents'
import { multiplyArray } from './utils'

const armorResistance = 0.735

interface AbilityOptions {
  apScaling: number
  spScaling: number
  mwModifier: number
  cooldown: number
  maxTargets: number
  physicalSchool: boolean
  hasteFlagged: boolean
  gcd: number
  requiredTalent: string | null
}

const defaulAbilityOptions: AbilityOptions = {
  apScaling: 0,
  cooldown: 0,
  gcd: 1.5,
  hasteFlagged: false,
  maxTargets: 1,
  mwModifier: 0,
  physicalSchool: true,
  requiredTalent: null,
  spScaling: 0,
}

export class Ability {
  name: string
  opts: AbilityOptions

  constructor(name: string, options: Partial<AbilityOptions>) {
    this.name = name
    this.opts = { ...defaulAbilityOptions, ...options }
  }

  damageHits(state: State, numTargets: number): number[] {
    const damage = this.baseDamage(state, numTargets)
    if (damage == 0) return []
    const targetsHit = Math.min(numTargets, this.opts.maxTargets)
    return Array(targetsHit).fill(damage)
  }

  baseDamage(state: State, _numTargets: number): number {
    let baseDamage =
      this.opts.apScaling * state.attackPower() +
      this.opts.spScaling * state.spellPower()
    baseDamage += baseDamage * this.opts.mwModifier
    const armorReduction = this.opts.physicalSchool ? armorResistance : 1
    return baseDamage * armorReduction * state.damageMultiplier()
  }

  sideEffects(state: State, damageHits: number[]): void {}

  hastedCooldown(state: State, cooldown = this.opts.cooldown) {
    const haste_multiplier = this.opts.hasteFlagged
      ? 1.0 / (1 + state.haste())
      : 1
    return cooldown * haste_multiplier
  }
}

class TigerPalm extends Ability {
  damageHits(state: State, numTargets: number) {
    const base = super.damageHits(state, numTargets)
    if (
      !state.isBuffActive(talentNames.faeline_stomp) ||
      !state.talents[talentNames.awakened_faeline]
    ) {
      return base
    }

    return multiplyArray(base, 2)
  }

  sideEffects(state: State, damageHits: number[]): void {
    if (state.talents[talentNames.eye_of_the_tiger]) {
      state.buffs[talentNames.eye_of_the_tiger] = 8
    }

    if (state.talents[talentNames.teachings]) {
      state.teachings += damageHits.length

      if (state.teachings > 4) state.teachings = 4
    }
  }
}

export const tigerPalm = new TigerPalm('Tiger Palm', {
  apScaling: 0.27027,
  mwModifier: 2.45,
})

class BlackoutKick extends Ability {
  damageHits(state: State, numTargets: number): number[] {
    const teachingHits = 1 + state.teachings
    const faelineTargets =
      state.isBuffActive(talentNames.faeline_stomp) &&
      state.talents[talentNames.ancient_concordance]
        ? Math.min(3, numTargets)
        : 1

    return multiplyArray(
      super.damageHits(state, numTargets),
      faelineTargets * teachingHits
    )
  }

  sideEffects(state: State, damageHits: number[]): void {
    const resetProbability = this.rskAnyResetProbability(
      state,
      damageHits.length
    )
    if (Math.random() < resetProbability) {
      state.cooldowns[risingSunKick.name] = 0
    }
    state.teachings = 0
  }

  rskAnyResetProbability(state: State, hits: number) {
    let probability = 0.15
    if (
      state.isBuffActive(talentNames.faeline_stomp) &&
      state.talents[talentNames.ancient_concordance]
    ) {
      probability += 0.6
    }
    return 1 - probability ** hits
  }
}

export const blackoutKick = new BlackoutKick('Blackout Kick', {
  apScaling: 0.847,
  mwModifier: 0.04,
  cooldown: 3,
  hasteFlagged: true,
})

class RisingSunKick extends Ability {
  baseDamage(state: State, _numTargets: number): number {
    const fastFeetMultiplier = state.talents[talentNames.fast_feet] ? 1.7 : 1
    return super.baseDamage(state, _numTargets) * fastFeetMultiplier
  }

  sideEffects(state: State, damageHits: number[]): void {
    if (state.empoweredRsks <= 0) return

    state.cooldowns[this.name] -= this.hastedCooldown(state, 9)
    state.empoweredRsks -= 1
    state.cooldowns['Thunder Focus Tea'] = 30

    if (
      state.talents[talentNames.secret_infusion] &&
      state.firstTftEmpowerAvailable
    ) {
      state.buffs[talentNames.secret_infusion] = 10
      state.firstTftEmpowerAvailable = false
    }
  }
}

export const risingSunKick = new RisingSunKick('Rising Sun Kick', {
  apScaling: 1.438,
  mwModifier: 0.79,
  cooldown: 12,
  hasteFlagged: true,
})

class SpinningCraneKick extends Ability {
  damageHits(state: State, numTargets: number): number[] {
    return multiplyArray(super.damageHits(state, numTargets), 4)
  }

  baseDamage(state: State, numTargets: number): number {
    const fastFeetMultiplier = state.talents[talentNames.fast_feet] ? 1.1 : 1
    let base = super.baseDamage(state, numTargets) * fastFeetMultiplier
    if (numTargets > 5) base *= Math.sqrt(5.0 / numTargets)
    return base
  }
}

export const spinningCraneKick = new SpinningCraneKick('Spinning Crane Kick', {
  apScaling: 0.1,
  mwModifier: 1.84,
  maxTargets: Infinity,
})

class FaelineStomp extends Ability {
  sideEffects(state: State, damageHits: number[]): void {
    state.buffs[talentNames.faeline_stomp] = 30
  }
}

export const faelineStomp = new FaelineStomp('Faeline Stomp', {
  apScaling: 0.4,
  mwModifier: 0.11,
  cooldown: 30,
  maxTargets: 5,
  physicalSchool: false,
  requiredTalent: talentNames.faeline_stomp,
})

class Invoke extends Ability {
  sideEffects(state: State, damageHits: number[]): void {
    if (state.talents[talentNames.gift_of_the_celestials]) {
      state.cooldowns[this.name] = 60
    }

    if (state.talents[talentNames.invokers_delight]) {
      state.buffs[talentNames.invokers_delight] = state.talents[
        talentNames.gift_of_the_celestials
      ]
        ? 8
        : 20
    }
  }
}

export const invoke = new Invoke('Invoke', {
  cooldown: 180,
  gcd: 1,
})

class SummonWhiteTigerStatue extends Ability {
  sideEffects(state: State, damageHits: number[]): void {
    state.buffs[talentNames.white_tiger_statue] = 30
  }
}

export const summonWhiteTigerStatue = new SummonWhiteTigerStatue(
  talentNames.white_tiger_statue,
  {
    cooldown: 120,
    gcd: 1,
    requiredTalent: talentNames.white_tiger_statue,
  }
)

class ThunderFocusTea extends Ability {
  sideEffects(state: State, damageHits: number[]): void {
    state.firstTftEmpowerAvailable = true
    state.empoweredRsks += 1

    if (state.talents[talentNames.focused_thunder]) {
      state.empoweredRsks += 1
    }

    if (state.talents[talentNames.tea_of_plenty]) {
      ;[...Array(2)].forEach(() => {
        if (Math.random() < 1 / 3) {
          state.empoweredRsks += 1
        }
      })
    }
  }
}

export const tft = new ThunderFocusTea('Thunder Focus Tea', {
  cooldown: 30,
  gcd: 0,
})

export const zenPulse = new Ability('Zen Pulse', {
  spScaling: 1.37816,
  cooldown: 30,
  maxTargets: Infinity,
  physicalSchool: false,
  requiredTalent: talentNames.zen_pulse,
})

export const chiBurst = new Ability('Chi Burst', {
  apScaling: 0.46,
  cooldown: 30,
  maxTargets: Infinity,
  physicalSchool: false,
})

class Fyrakks extends Ability {
  sideEffects(state: State, damageHits: number[]): void {
    state.buffs[fyrakks.name] = 10
  }
}

export const fyrakks = new Ability("Fyrakk's Tainted Rageheart", {
  cooldown: 90,
  gcd: 0,
})

export const allAbilities: Ability[] = [
  tigerPalm,
  blackoutKick,
  risingSunKick,
  spinningCraneKick,
  faelineStomp,
  invoke,
  summonWhiteTigerStatue,
  tft,
  zenPulse,
  chiBurst,
]
