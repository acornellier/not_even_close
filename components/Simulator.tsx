import { CharacterStats } from '../simulator/characterStats'
import { Ability } from '../simulator/abilities'
import { Result, simulate } from '../simulator/sim'
import { NumericInput } from './NumericInput'
import { Toggle } from './Toggle'
import { CharacterStatsForm } from './CharacterStatsForm'
import { Dropdown } from './Dropdown'
import { classAbilities, classes, WowClass } from '../simulator/classes'
import { AbilitySelect } from './AbilitySelect'
import { Results } from './Results'
import { useEffect, useState } from 'react'

const defaultCharacterStats: CharacterStats = {
  stamina: 40_000,
  versatilityDrPercent: 5,
}

export function Simulator() {
  const [characterStats, setCharacterStats] = useState(defaultCharacterStats)
  const [wowClass, setClass] = useState<WowClass | null>('Monk')
  const [abilities, setAbilities] = useState<Ability[]>([])

  const [baseDamage, setBaseDamage] = useState(100_000)
  const [keyLevel, setKeyLevel] = useState(25)
  const [fortAmp, setFortAmp] = useState(false)
  const [tyranAmp, setTyranAmp] = useState(true)

  const [result, setResult] = useState<Result>()

  useEffect(() => {
    setAbilities(
      wowClass
        ? classAbilities[wowClass].filter(({ alwaysOn }) => alwaysOn)
        : []
    )
  }, [wowClass])

  useEffect(() => {
    const newResult = simulate({
      characterStats,
      wowClass,
      abilities,
      baseDamage,
      keyLevel,
      fortAmp,
      tyranAmp,
    })
    setResult(newResult)
  }, [
    characterStats,
    baseDamage,
    keyLevel,
    fortAmp,
    tyranAmp,
    wowClass,
    abilities,
  ])

  return (
    <div className="flex gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <NumericInput
            label="Base Damage"
            onChange={setBaseDamage}
            value={baseDamage}
          />
          <NumericInput
            label="Key Level"
            max={30}
            min={2}
            onChange={setKeyLevel}
            value={keyLevel}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <Toggle
            label="Fort amplifier"
            checked={fortAmp}
            onChange={setFortAmp}
          />
          <Toggle
            label="Tyran amplifier"
            checked={tyranAmp}
            onChange={setTyranAmp}
          />
        </div>
        <CharacterStatsForm
          characterStats={characterStats}
          onChange={setCharacterStats}
        />

        <div className="flex gap-4 items-center">
          <Dropdown
            options={classes}
            label="Class"
            onChange={(value) => setClass(value as WowClass)}
            value={wowClass}
          />

          {wowClass && (
            <AbilitySelect
              wowClass={wowClass}
              selectedAbilities={abilities}
              setAbilities={setAbilities}
            />
          )}
        </div>

        <div>
          <div>Shadow Bolt base damage: 106831</div>
          <div>Shattered Earth base damage: 115355</div>
          <div>Earthshaking Roar base damage: 109862</div>
          <div>Soulrend base damage: 100304</div>
          <div>Shock Blast damage: 129087</div>
          <div>Apocalyptic Nightmare base damage: 137327</div>
        </div>
      </div>

      <Results result={result} />
    </div>
  )
}
