import { classSpecs, WowClass } from '../backend/classes.ts'
import { Character } from '../backend/characters.ts'
import { roundTo } from '../backend/utils.ts'
import { fortitude, markOfTheWild } from '../backend/groupAbilities/groupBuffs.ts'
import { Ability } from '../backend/ability.ts'
import { tepidVersatility } from '../backend/groupAbilities/externals.ts'

export interface AddonOutput {
  character: Partial<Character>
  groupBuffs: Ability[]
  addTepidVers: boolean
}

function findValue(lines: string[], key: string) {
  for (const line of lines) {
    if (line.startsWith(key)) {
      const splits = line.split('=')
      return splits[1]!.trim()
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
  const versatilityRaw = Number(findValue(lines, 'versatilityRaw'))
  const avoidanceRaw = Number(findValue(lines, 'avoidanceRaw'))
  const armor = Number(findValue(lines, 'armor'))
  const mainStat = Number(findValue(lines, 'mainStat'))
  const buffs = findValue(lines, 'buffs')

  return {
    spec: isValidClassSpec ? { class: wowClass, spec } : null,
    stats: {
      stamina: stamina,
      versatilityRaw: roundTo(versatilityRaw, 3),
      avoidanceRaw: roundTo(avoidanceRaw, 3),
      armor,
      mainStat,
    },
    buffs: buffs.split(',').map(Number),
  }
}

export function getAddonOutput(text: string): AddonOutput {
  const addonOutput = parseAddon(text)

  const character = {
    ...(addonOutput.spec ? { classSpec: addonOutput.spec } : {}),
    stats: addonOutput.stats,
  }

  const groupBuffs: Ability[] = []

  if (addonOutput.buffs.includes(markOfTheWild.spellId)) {
    groupBuffs.push(markOfTheWild)
  }

  let addTepidVers = false
  if (addonOutput.buffs.includes(tepidVersatility.spellId)) {
    character.stats.versatilityRaw -= tepidVersatility.versRawIncrease!
    addTepidVers = true
  }

  if (addonOutput.buffs.includes(fortitude.spellId)) {
    character.stats.stamina = Math.ceil(character.stats.stamina / 1.05)
    groupBuffs.push(fortitude)
  }

  return {
    character,
    groupBuffs,
    addTepidVers,
  }
}
