import { APL } from '../../simulator/apl'

interface Props {
  editable?: boolean
  apl: APL
  onChange: (apl: APL) => void
}

export function AplEditor({ apl, onChange }: Props) {
  return (
    <div>
      {apl.logic.map(([ability, condition, explanation], idx) => (
        <div key={idx} className="flex">
          {idx + 1}. {ability.name} {explanation && `- ${explanation}`}
        </div>
      ))}
    </div>
  )
}
