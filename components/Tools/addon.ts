import { ClassSpec, classSpecs, WowClass } from '../../backend/classes'
import { CharacterStatsInput } from '../../backend/characterStats'
import { roundTo } from '../../backend/utils'

export interface AddonOutput {
  spec: ClassSpec | null
  stats: CharacterStatsInput
}

function findValue(lines: string[], key: string) {
  for (let line of lines) {
    if (line.startsWith(key)) {
      const splits = line.split('=')
      return splits[1].trim()
    }
  }

  return ''
}

export function isAddonPaste(text: string) {
  const lines = text.split('\n')
  return lines.some((line) => line.startsWith('# NotEvenClose Addon'))
}

export function parseAddon(text: string): AddonOutput {
  const lines = text.split('\n')

  const wowClass = findValue(lines, 'class') as WowClass
  const spec = findValue(lines, 'spec')
  const isValidClassSpec = classSpecs[wowClass]?.[spec] !== undefined

  const stamina = Number(findValue(lines, 'stamina'))
  const versatilityPercent = Number(findValue(lines, 'versatilityPercent'))
  const avoidancePercent = Number(findValue(lines, 'avoidancePercent'))

  return {
    spec: isValidClassSpec ? { class: wowClass, spec } : null,
    stats: {
      stamina: stamina,
      versatilityPercent: roundTo(versatilityPercent, 3),
      avoidancePercent: roundTo(avoidancePercent, 3),
    },
  }
}
