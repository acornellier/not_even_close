import { Simulation } from '../../simulator/simulator'
import { useState } from 'react'
import { simulate, SimulatorOptions } from '../../simulator/sim'

interface Props {
  simOptions: Omit<SimulatorOptions, 'setSimProgress'>
  setSims: (sims: Simulation[]) => void
}

export function SimulateButton({ simOptions, setSims }: Props) {
  const [simProgress, setSimProgress] = useState<number | null>(null)

  const onSimulate = async () => {
    const sims = await simulate({ ...simOptions, setSimProgress })
    setSims(sims)
  }

  return simProgress === null ? (
    <button
      className="w-64 rounded-full px-4 py-2 bg-teal-500 hover:bg-teal-700 font-bold text-lg"
      onClick={onSimulate}
    >
      Simulate!
    </button>
  ) : (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-teal-600 h-2.5 rounded-full"
        style={{
          transition: 'width 0.03s linear',
          width: `${simProgress * 100}%`,
        }}
      />
    </div>
  )
}
