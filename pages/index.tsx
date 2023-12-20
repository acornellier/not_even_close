import { NumericInput } from '../components/NumericInput'
import { useEffect, useState } from 'react'
import { CharacterStatsForm } from '../components/CharacterStatsForm'
import { CharacterStats } from '../simulator/characterStats'
import Head from 'next/head'
import GitHubButton from 'react-github-btn'
import { Toggle } from '../components/Toggle'
import { Result, simulate } from '../simulator/sim'
import { roundTo } from '../simulator/utils'

const defaultCharacterStats: CharacterStats = {
  stamina: 40_000,
  versatilityPercent: 0.15,
}

export default function Home() {
  const [characterStats, setCharacterStats] = useState(defaultCharacterStats)
  const [drs, setDrs] = useState<number[]>([])
  const [baseDamage, setBaseDamage] = useState(100_000)
  const [keyLevel, setKeyLevel] = useState(20)
  const [fortAmp, setFortAmp] = useState(false)
  const [tyranAmp, setTyranAmp] = useState(false)

  const [result, setResult] = useState<Result>()

  useEffect(() => {
    const newResult = simulate({
      characterStats,
      drs,
      baseDamage,
      keyLevel,
      fortAmp,
      tyranAmp,
    })
    setResult(newResult)
  }, [characterStats, baseDamage, keyLevel, fortAmp, tyranAmp])

  return (
    <div className="px-8 lg:px-16">
      <Head>
        <title>Not Even Close</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen py-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-6xl font-bold text-center text-teal-500">
            Not Even Close
          </h1>
          <GitHubButton href="https://github.com/acornellier/not_even_close" />
        </div>

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

            <div>
              <div>Shadow Bolt base damage: 106831</div>
              <div>Shattered Earth base damage: 115355</div>
              <div>Earthshaking Roar base damage: 109862</div>
              <div>Soulrend base damage: 100304</div>
              <div>Shock Blast damage: 129087</div>
              <div>Apocalyptic Nightmare base damage: 137327</div>
            </div>
          </div>
          {result && (
            <div>
              <div className="font-bold text-4xl">
                {result.survival ? 'You will survive!' : 'You will die'}
              </div>
              <div>Damage scaling: {result.damageScaling}</div>
              <div>Scaled damage: {result.scaledDamage}</div>
              <div>
                Damage reduction: {roundTo(result.damageReduction * 100, 2)}%
              </div>
              <div>Mitigated damage: {result.mitigatedDamage}</div>
              <div>Actual damage taken: {result.actualDamageTaken}</div>
              <div>Starting health: {result.startingHealth}</div>
              {result.survival ? (
                <div>
                  Health remaining: {result.healthRemaining} (
                  {roundTo(
                    (result.healthRemaining / result.startingHealth) * 100,
                    2
                  )}
                  %)
                </div>
              ) : (
                <div>Overkill: {-result.healthRemaining}</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
