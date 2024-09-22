import type { ClassSpec, WowClass } from '../backend/classes.ts'
import { classSpecs } from '../backend/classes.ts'
import type { CharacterStatsInput } from '../backend/characters.ts'
import { roundTo } from './utils.ts'
import { fortitude, markOfTheWild } from '../backend/groupAbilities/groupBuffs.ts'
import type { Ability } from '../backend/ability.ts'
import { temperedVersatility } from '../backend/groupAbilities/externals.ts'

export interface AddonCharacter {
  classSpec: ClassSpec
  stats: CharacterStatsInput
  groupBuffs: Ability[]
  spellIds: number[]
  talents: Array<[number, number]>
  addTemperedVers: boolean
}

export type AddonOutput = AddonCharacter[]

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
  const sections = text.split('##################')
  return sections.map((section) => {
    const lines = section.split('\n')

    const wowClass = findValue(lines, 'class') as WowClass
    const spec = findValue(lines, 'spec')
    const isValidClassSpec = classSpecs[wowClass]?.[spec] !== undefined

    if (!isValidClassSpec) throw new Error(`Invalid class spec: ${wowClass} ${spec}`)

    const stamina = Number(findValue(lines, 'stamina'))
    const versatilityRaw = Number(findValue(lines, 'versatilityRaw'))
    const avoidanceRaw = Number(findValue(lines, 'avoidanceRaw'))
    const armor = Number(findValue(lines, 'armor'))
    const mainStat = Number(findValue(lines, 'mainStat'))
    const buffs = findValue(lines, 'buffs')
    const spells = findValue(lines, 'spells')
    const talentsStr = findValue(lines, 'talents')

    return {
      spec: { class: wowClass, spec },
      stats: {
        stamina: stamina,
        versatilityRaw: roundTo(versatilityRaw, 3),
        avoidanceRaw: roundTo(avoidanceRaw, 3),
        armor,
        mainStat,
      },
      buffs: buffs.split(',').map(Number),
      spellIds: spells.split(',').map(Number),
      talents:
        talentsStr == '' ? [] : (JSON.parse(talentsStr) as Array<[number, number]>),
    }
  })
}

export function getAddonOutput(text: string): AddonOutput {
  const output = parseAddon(text)

  return output.map<AddonCharacter>((characterOutput) => {
    const stats = characterOutput.stats

    const groupBuffs: Ability[] = []

    if (characterOutput.buffs.includes(markOfTheWild.id)) {
      groupBuffs.push(markOfTheWild)
    }

    let addTemperedVers = false
    if (characterOutput.buffs.includes(temperedVersatility.id)) {
      stats.versatilityRaw -= temperedVersatility.versRawIncrease!
      addTemperedVers = true
    }

    if (characterOutput.buffs.includes(fortitude.id)) {
      stats.stamina = Math.ceil(stats.stamina / 1.05)
      groupBuffs.push(fortitude)
    }

    return {
      classSpec: characterOutput.spec,
      stats,
      groupBuffs,
      spellIds: characterOutput.spellIds,
      talents: characterOutput.talents,
      addTemperedVers: addTemperedVers,
    }
  })
}
