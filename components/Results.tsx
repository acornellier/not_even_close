import { Result } from '../simulator/sim'
import { roundTo } from '../simulator/utils'

export function Results(props: { result: Result | undefined }) {
  return (
    <>
      {props.result && (
        <div>
          <div className="font-bold text-4xl">
            {props.result.survival ? (
              <span>
                You will <span className="text-green-500">survive</span>
              </span>
            ) : (
              <span>
                You will <span className="text-red-500">die</span>
              </span>
            )}
          </div>
          <div>Damage scaling: {props.result.damageScaling}</div>
          <div>Scaled damage: {props.result.scaledDamage}</div>
          <div>
            Damage reduction: {roundTo(props.result.damageReduction * 100, 2)}%
          </div>
          <div>Mitigated damage: {props.result.mitigatedDamage}</div>
          <div>Actual damage taken: {props.result.actualDamageTaken}</div>
          <div>Starting health: {props.result.startingHealth}</div>
          {props.result.survival ? (
            <div>
              Health remaining: {props.result.healthRemaining} (
              {roundTo(
                (props.result.healthRemaining / props.result.startingHealth) *
                  100,
                2
              )}
              %)
            </div>
          ) : (
            <div>Overkill: {-props.result.healthRemaining}</div>
          )}
        </div>
      )}
    </>
  )
}
