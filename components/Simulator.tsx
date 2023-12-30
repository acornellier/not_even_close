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

const defaultCharacterStats: CharacterStatsInput = {
  stamina: 41_000,
  versatilityPercent: 5,
  avoidancePercent: 3,
}

export function Simulator() {
  const [characterStats, setCharacterStats] = useState(defaultCharacterStats)
  const [classSpec, setClass] = useState<WowClassSpec>({
    class: 'Monk',
    spec: 'Mistweaver',
  })
  const [selectedSpecAbilities, setSelectedSpecAbilities] = useState<Ability[]>([])
  const [selectedGroupAbilities, setSelectedGroupAbilities] = useState<Ability[]>([])

  const [baseDamage, setBaseDamage] = useState(100_000)
  const [keyLevel, setKeyLevel] = useState(28)
  const [isAoe, setIsAoe] = useState(false)
  const [fortAmp, _setFortAmp] = useState(false)
  const [tyranAmp, setTyranAmp] = useState(true)

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
      baseDamage,
      keyLevel,
      isAoe,
      fortAmp,
      tyranAmp,
    })
    setResult(newResult)
  }, [
    characterStats,
    baseDamage,
    keyLevel,
    isAoe,
    fortAmp,
    tyranAmp,
    selectedGroupAbilities,
    selectedSpecAbilities,
  ])

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <NumericInput
            label="Base Damage taken"
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
          {/*<Toggle*/}
          {/*  label="Fort amplifier"*/}
          {/*  checked={fortAmp}*/}
          {/*  onChange={_setFortAmp}*/}
          {/*/>*/}
          <Toggle label="AoE damage" checked={isAoe} onChange={setIsAoe} />
          <Toggle label="Tyran amplifier" checked={tyranAmp} onChange={setTyranAmp} />
        </div>

        <div className="border-2 " />

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

        <div className="border-2" />

        <BossAbilities
          onSelect={(ability) => {
            setIsAoe(ability.isAoe)
            setBaseDamage(ability.damage)
          }}
        />
      </div>

      <div className="border-2 mx-2" />

      <div className="basis-96">
        <Results result={result} />

        <div className="border-2 my-4" />

        <Instructions />
      </div>
    </div>
  )
}
