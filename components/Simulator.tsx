import { CharacterStatsInput } from '../backend/characterStats'
import { Hit, Result, simulate } from '../backend/sim'
import { NumericInput } from './NumericInput'
import { Toggle } from './Toggle'
import { CharacterStatsForm } from './CharacterStatsForm'
import { ClassDropdown } from './ClassDropdown'
import { classSpecs, WowClassSpec } from '../backend/classes'
import { AbilitySelect } from './AbilitySelect'
import { ResultSummary } from './ResultSummary'
import { useEffect, useState } from 'react'
import { Ability } from '../backend/ability'
import { BossAbilities } from './BossAbilities'
import { GroupBuffs } from './GroupBuffs'
import { groupActives, groupBuffs, otherBuffs } from '../backend/groupBuffs'
import { Instructions } from './Instructions'
import { augmentAbilities } from '../backend/utils'
import useLocalStorage from './useLocalStorage'
import { CustomDrs } from './CustomDrs'
import { ResultMini } from './ResultMini'
import { Dungeon } from '../backend/bossAbilities'

const defaultCharacterStats: CharacterStatsInput = {
  stamina: 41_000,
  versatilityPercent: 5,
  avoidancePercent: 3,
}

const defaultClassSpec: WowClassSpec = { class: 'Monk', spec: 'Mistweaver' }

export interface AbilitySettings {
  hits: Hit[]
  selectedDungeon: Dungeon | null
}

const defaultHit: Hit = { baseDamage: 100_000, isAoe: false }
const defaultAbilitySettings = { hits: [defaultHit], selectedDungeon: null }

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

  const [keyLevel, setKeyLevel] = useState(28)
  const [fortAmp, _setFortAmp] = useState(false)
  const [tyranAmp, setTyranAmp] = useState(true)

  const [abilitySettings, setAbilitySettings] =
    useState<AbilitySettings>(defaultAbilitySettings)

  function setHitField<T>(field: keyof Hit) {
    return (hitIndex: number, value: T) => {
      setAbilitySettings((prevAbilitySettings) => ({
        ...prevAbilitySettings,
        hits: prevAbilitySettings.hits.map((hit, index) =>
          index === hitIndex ? { ...hit, [field]: value } : hit
        ),
      }))
    }
  }

  const setBaseDamage = setHitField<number>('baseDamage')
  const setIsAoe = setHitField<boolean>('isAoe')

  const [results, setResults] = useState<Result[]>([])
  const specAbilities = classSpecs[classSpec.class][classSpec.spec].abilities

  console.log(abilitySettings)
  console.log(results)

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

    const newResults = simulate({
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
      keyLevel,
      fortAmp,
      tyranAmp,
      hits: abilitySettings.hits,
    })
    setResults(newResults)
  }, [
    characterStats,
    customDrs,
    keyLevel,
    fortAmp,
    tyranAmp,
    abilitySettings.hits,
    selectedGroupAbilities,
    selectedSpecAbilities,
  ])

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap items-end">
          <NumericInput
            label="Key level"
            min={2}
            onChange={(val) => setKeyLevel(val ?? 0)}
            value={keyLevel}
          />
          <Toggle label="Tyran amplifier" checked={tyranAmp} onChange={setTyranAmp} />
          {/*<Toggle label="Fort amplifier" checked={fortAmp} onChange={_setFortAmp} />*/}
        </div>

        {abilitySettings.selectedDungeon ? (
          <span className="font-bold text-2xl">
            Dungeon selected: {abilitySettings.selectedDungeon}
          </span>
        ) : (
          abilitySettings.hits.map((hit, hitIndex) => (
            <div key={hitIndex} className="flex gap-4 flex-wrap items-end">
              <NumericInput
                label="Base damage taken"
                step={1000}
                onChange={(val) => setBaseDamage(hitIndex, val ?? 0)}
                value={hit.baseDamage}
              />
              <Toggle
                label="AoE damage"
                checked={hit.isAoe}
                onChange={(val) => setIsAoe(hitIndex, val)}
              />
            </div>
          ))
        )}

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

        <BossAbilities setAbilitySettings={setAbilitySettings} />
      </div>

      <div className="border-2 mx-2 dark:border-gray-600" />

      <div className="basis-96">
        {abilitySettings.selectedDungeon ? (
          <div className="flex flex-col gap-4">
            <span className="font-bold text-2xl">Results</span>
            {results.map((result, idx) => (
              <ResultMini key={idx} result={result} />
            ))}
          </div>
        ) : (
          results[0] && <ResultSummary result={results[0]} />
        )}

        <div className="border-2 my-4 dark:border-gray-600" />

        <Instructions />
      </div>
    </div>
  )
}
