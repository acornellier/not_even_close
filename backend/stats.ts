import { roundTo } from './utils'

const healthPerStamina = 20
const versConversionFactor = 204.9944775
const avoidanceConversionFactor = 71.9980604

// Changes every patch
// https://docs.google.com/document/d/1FJlB1T8ijaQLjY_cihyoyhLoi6lYRnT-N-ipVFCLidE/edit#heading=h.a7ifehuynye8
const armorKValueMplus = 18672.642

interface StatBracketBasic {
  size: number
  penalty: number
}

interface StatBracket extends StatBracketBasic {
  percent: number
  rawValue: number
}

const secondaryStatBracketsBasic = [
  { size: 30, penalty: 0 },
  { size: 9, penalty: 0.1 },
  { size: 8, penalty: 0.2 },
  { size: 7, penalty: 0.3 },
  { size: 12, penalty: 0.4 },
  { size: 60, penalty: 0.5 },
  { size: 60, penalty: 1.0 },
  { size: 100000, penalty: 1.0 },
]

const tertiaryStatBracketsBasic = [
  { size: 10, penalty: 0 },
  { size: 4, penalty: 0.2 },
  { size: 3, penalty: 0.4 },
  { size: 2, penalty: 0.6 },
  { size: 100000, penalty: 0.6 },
]

function makeStatBrackets(
  conversionFactor: number,
  statBracketsBasic: StatBracketBasic[]
): StatBracket[] {
  let prevBreakpoint = { size: 0, penalty: 0, percent: 0, rawValue: 0 }
  return statBracketsBasic.map((bracket) => {
    prevBreakpoint = {
      ...bracket,
      rawValue: bracket.size * conversionFactor * (1 / (1.0 - bracket.penalty)),
      percent: prevBreakpoint.percent + bracket.size,
    }
    return prevBreakpoint
  })
}

const versStatBrackets = makeStatBrackets(
  versConversionFactor,
  secondaryStatBracketsBasic
)
const avoidanceStatBrackets = makeStatBrackets(
  avoidanceConversionFactor,
  tertiaryStatBracketsBasic
)

function rawToPercent(
  rawStat: number,
  conversionFactor: number,
  statBrackets: StatBracket[]
) {
  let percent = 0
  let remainingRawStat = rawStat

  for (const bracket of statBrackets) {
    if (remainingRawStat > bracket.rawValue) {
      remainingRawStat -= bracket.rawValue
      percent = bracket.percent
    } else {
      percent += (remainingRawStat / conversionFactor) * (1 - bracket.penalty)
      break
    }
  }

  return roundTo(percent, 2)
}

export const staminaToHp = (stamina: number) => stamina * healthPerStamina

export const versRawToPercent = (rawVers: number) =>
  rawToPercent(rawVers, versConversionFactor, versStatBrackets)

export const avoidanceRawToPercent = (rawAvoidance: number) =>
  rawToPercent(rawAvoidance, avoidanceConversionFactor, avoidanceStatBrackets)

export const armorToPhysicalDr = (armor: number) => armor / (armor + armorKValueMplus)
