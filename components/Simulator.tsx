import { CharacterStatsInput } from '../backend/characterStats'
import { Result, simulate } from '../backend/sim'
import { NumericInput } from './NumericInput'
import { Toggle } from './Toggle'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from './ClassDropdown'
import { classSpecs, WowClassSpec } from '../backend/classes'
import { AbilitySelect } from './AbilitySelect'
import { Results } from './Results'
import { useEffect, useState } from 'react'
import { Ability } from '../backend/ability'
import { BossAbilities } from './BossAbilities'
import { GroupBuffs } from './GroupBuffs'
import { groupActives, groupBuffs, otherBuffs } from '../backend/groupBuffs'
import { Instructions } from './Instructions'
import { augmentAbilities } from '../backend/utils'
import useLocalStorage from './useLocalStorage'
import { CustomDrs } from './CustomDrs'
import { set } from 'zod'

const defaultCharacterStats: CharacterStatsInput = {
  stamina: 41_000,
  versatilityPercent: 5,
  avoidancePercent: 3,
}

const defaultClassSpec: WowClassSpec = {
  class: 'Monk',
  spec: 'Mistweaver',
}

export function Simulator() {
  const [characterStats, setCharacterStats] = useLocalStorage(
    'characterStats',
    defaultCharacterStats
  )
  const [classSpec, setClass] = useLocalStorage<WowClassSpec>(
    'wowClassSpec',
    defaultClassSpec
  )
  const [selectedSpecAbilities, setSelectedSpecAbilities] = useState<Ability[]>([])
  const [selectedGroupAbilities, setSelectedGroupAbilities] = useState<Ability[]>([])
  const [customDrs, setCustomDrs] = useState('')

  const [baseDamage, setBaseDamage] = useState(100_000)
  const [keyLevel, setKeyLevel] = useState(28)
  const [isAoe, setIsAoe] = useState(false)
  const [fortAmp, setFortAmp] = useState(false)
  const [tyranAmp, setTyranAmp] = useState(true)

  const changeTyranAmp = (val: boolean) => {
    setTyranAmp(val)
    if (val) setFortAmp(false)
  }

  const changeFortAmp = (val: boolean) => {
    setFortAmp(val)
    if (val) setTyranAmp(false)
  }

  const [result, setResult] = useState<Result | null>(null)

  const specAbilities = classSpecs[classSpec.class][classSpec.spec].abilities

  useEffect(() => {
    setSelectedSpecAbilities(specAbilities.filter(({ onByDefault }) => onByDefault))
  }, [classSpec, specAbilities])

  useEffect(() => {
    const augmentedSelectedAbilities = augmentAbilities(
      selectedSpecAbilities,
      selectedSpecAbilities
    )

    const augmentedSelectedGroupAbilities = augmentAbilities(
      selectedGroupAbilities,
      selectedGroupAbilities
    )

    const newResult = simulate({
      characterStats: {
        stamina: characterStats.stamina ?? 0,
        versatility: (characterStats.versatilityPercent ?? 0) / 100,
        avoidance: (characterStats.avoidancePercent ?? 0) / 100,
      },
      abilities: [...augmentedSelectedAbilities, ...augmentedSelectedGroupAbilities],
      customDrs: customDrs
        .split(',')
        .map((v) => Number(v))
        .filter(Boolean),
      baseDamage,
      keyLevel,
      isAoe,
      fortAmp,
      tyranAmp,
    })
    setResult(newResult)
  }, [
    characterStats,
    customDrs,
    baseDamage,
    keyLevel,
    isAoe,
    fortAmp,
    tyranAmp,
    selectedGroupAbilities,
    selectedSpecAbilities,
  ])

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <NumericInput
            label="Base Damage taken"
            step={1000}
            onChange={(val) => setBaseDamage(val ?? 0)}
            value={baseDamage}
          />
          <NumericInput
            label="Key Level"
            min={2}
            onChange={(val) => setKeyLevel(val ?? 0)}
            value={keyLevel}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <Toggle label="AoE damage" checked={isAoe} onChange={setIsAoe} />
          <Toggle label="Tyran amplifier" checked={tyranAmp} onChange={changeTyranAmp} />
          <Toggle label="Fort amplifier" checked={fortAmp} onChange={changeFortAmp} />
        </div>

        <div className="border-2 dark:border-gray-600" />

        <CharacterStatsForm
          characterStats={characterStats}
          onChange={setCharacterStats}
        />

        <div className="flex gap-4 items-start flex-col md:flex-row md:items-center">
          <ClassDropdown onChange={setClass} selectedClassSpec={classSpec} />
          <AbilitySelect
            allAbilities={specAbilities}
            selectedAbilities={selectedSpecAbilities}
            setSelectedAbilities={setSelectedSpecAbilities}
          />
        </div>

        <GroupBuffs
          label="Group buffs"
          allAbilities={groupBuffs}
          selectedGroupAbilities={selectedGroupAbilities}
          setSelectedGroupAbilities={setSelectedGroupAbilities}
        />

        <GroupBuffs
          label="Group actives"
          allAbilities={groupActives}
          selectedGroupAbilities={selectedGroupAbilities}
          setSelectedGroupAbilities={setSelectedGroupAbilities}
        />

        <GroupBuffs
          label="Externals"
          allAbilities={otherBuffs}
          selectedGroupAbilities={selectedGroupAbilities}
          setSelectedGroupAbilities={setSelectedGroupAbilities}
        />

        <CustomDrs customDrs={customDrs} setCustomDrs={setCustomDrs} />

        <div className="border-2 dark:border-gray-600" />

        <BossAbilities
          onSelect={(ability) => {
            setIsAoe(ability.isAoe)
            setBaseDamage(ability.damage)
          }}
        />
      </div>

      <div className="border-2 mx-2 dark:border-gray-600" />

      <div className="basis-96">
        <Results result={result} />

        <div className="border-2 my-4 dark:border-gray-600" />

        <Instructions />
      </div>
    </div>
  )
}
