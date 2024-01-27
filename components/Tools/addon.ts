import { classSpecs, defaultAbilities, WowClass } from '../../backend/classes'
import { Character } from '../../backend/characters'
import { roundTo } from '../../backend/utils'
import { fortitude, markOfTheWild } from '../../backend/groupAbilities/groupBuffs'
import { Ability } from '../../backend/ability'

export interface AddonOutput {
  character: Partial<Character>
  groupBuffs: Ability[]
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

function parseAddon(text: string) {
  const lines = text.split('\n')

  const wowClass = findValue(lines, 'class') as WowClass
  const spec = findValue(lines, 'spec')
  const isValidClassSpec = classSpecs[wowClass]?.[spec] !== undefined

  const stamina = Number(findValue(lines, 'stamina'))
  const versatilityPercent = Number(findValue(lines, 'versatilityPercent'))
  const avoidancePercent = Number(findValue(lines, 'avoidancePercent'))
  const buffs = findValue(lines, 'buffs')

  return {
    spec: isValidClassSpec ? { class: wowClass, spec } : null,
    stats: {
      stamina: stamina,
      versatilityPercent: roundTo(versatilityPercent, 3),
      avoidancePercent: roundTo(avoidancePercent, 3),
    },
    buffs: buffs.split(',').map(Number),
  }
}

export function getAddonOutput(text: string): AddonOutput {
  const addonOutput = parseAddon(text)

  const newCharacter = {
    ...(addonOutput.spec ? { classSpec: addonOutput.spec } : {}),
    stats: addonOutput.stats,
  }

  let groupBuffs: Ability[] = []
  if (addonOutput.buffs.includes(markOfTheWild.spellId)) {
    newCharacter.stats.versatilityPercent -= 3
    groupBuffs.push(markOfTheWild)
  }

  if (addonOutput.buffs.includes(fortitude.spellId)) {
    newCharacter.stats.stamina = Math.ceil(newCharacter.stats.stamina / 1.05)
    groupBuffs.push(fortitude)
  }

  return {
    character: newCharacter,
    groupBuffs,
  }
}
