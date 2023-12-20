import {
  getDependencies,
  Talent,
  talentGroups,
  TalentMap,
  talentNames,
} from '../../simulator/talents'
import {Toggle} from '../Toggle'

interface Props {
  talents: TalentMap
  onChangeTalents: (talents: TalentMap) => void
}

const getAffectedTalents = (talent: Talent, checked: boolean) => {
  if (checked) {
    return getDependencies(talent).reduce((acc, other) => {
      acc[other] = other === talentNames.secret_infusion ? 2 : 1
      return acc
    }, {} as TalentMap)
  } else {
    return Object.values(talentNames)
      .filter((other) => getDependencies(other as Talent).includes(talent))
      .reduce((acc, other) => {
        acc[other as Talent] = 0
        return acc
      }, {} as TalentMap)
  }
}

export function TalentEditor({talents, onChangeTalents}: Props) {
  const onChange = (talent: Talent) => (checked: boolean) => {
    const affectedTalents = getAffectedTalents(talent, checked)

    onChangeTalents({
      ...talents,
      ...affectedTalents,
      [talent]: checked ? 1 : 0,
    })
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {talentGroups.map((talentGroup, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          {talentGroup.map((talent) => (
            <Toggle
              key={talent}
              label={talent}
              checked={talents[talent] > 0}
              onChange={onChange(talent as Talent)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
