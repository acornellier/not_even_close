import {prettyTalents} from '../../simulator/utils'
import {Fragment, useState} from 'react'
import {Talent} from '../../simulator/talents'
import {Simulation} from '../../simulator/simulator'
import {Toggle} from '../Toggle'

interface Props {
  index: number
  sim: Simulation
  talentsToTest: Talent[]
}

export function SimulationStats({index, sim, talentsToTest}: Props) {
  const [showCasts, setShowCasts] = useState(false)
  const [showAbilityBreakdown, setShowAbilityBreakdown] = useState(false)

  const dps = `${sim.averageDps()} dps (${sim
    .worstIteration()
    .dps()} dps - ${sim.bestIteration().dps()} dps)`

  const iter = sim.medianIteration()
  const abilityStats = iter.abilityStats()

  return (
    <div className="flex flex-col gap-2">
      <b className="text-xl">
        {talentsToTest.length > 0
          ? `${index + 1}. ${prettyTalents(sim.opts.talents, talentsToTest)} | `
          : 'Results: '}
        {dps}
      </b>
      <div>
        Median dps: {iter.dps()} dps ({iter.damage()} dmg)
      </div>
      <Toggle
        label="Ability damage breakdown"
        checked={showAbilityBreakdown}
        onChange={setShowAbilityBreakdown}
      />
      <Toggle
        label="Cast timeline"
        checked={showCasts}
        onChange={setShowCasts}
      />
      {showAbilityBreakdown && (
        <div>
          {abilityStats.map((stat, idx) => (
            <div key={stat.name}>
              {idx + 1}. {stat.name}: {stat.dps} dps ({stat.damagePercent}%){' '}
              {stat.damage} dmg, {stat.castCount} casts, {stat.hitCount} hits
            </div>
          ))}
        </div>
      )}
      {showCasts && (
        <div className="grid gap-x-2 grid-cols-[4rem_10rem_8rem]">
          <div className="w-12 font-bold">Time</div>
          <div className="font-bold">Cast</div>
          <div className="font-bold">Damage</div>
          {iter.castHistory.map((cast, idx) => (
            <Fragment key={idx}>
              <div className="w-12">{Math.round(cast.time * 100) / 100}</div>
              <div>{cast.name}</div>
              <div>{Math.round(cast.damage)}</div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
