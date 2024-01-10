import { NumericInput } from '../Inputs/NumericInput'
import { OnOffStateSelector } from '../Inputs/OnOffStateSelector'
import { Toggle } from '../Inputs/Toggle'
import { EnemyAbilityDetails } from '../../backend/sim'

interface Props {
  enemyAbilityDetails: EnemyAbilityDetails
  setEnemyAbilityDetails: (value: EnemyAbilityDetails) => void
}

export function EnemyAbilityDetailsInput({
  enemyAbilityDetails,
  setEnemyAbilityDetails,
}: Props) {
  const setField =
    <T extends keyof EnemyAbilityDetails>(field: T) =>
    (value: EnemyAbilityDetails[T]) =>
      setEnemyAbilityDetails({ ...enemyAbilityDetails, [field]: value })

  const setBaseDamage = setField('baseDamage')

  return (
    <div className="flex gap-4 flex-wrap items-end">
      <NumericInput
        label="Base damage taken"
        step={1000}
        onChange={(value) => setBaseDamage(value ?? 0)}
        value={enemyAbilityDetails.baseDamage}
      />
      <OnOffStateSelector
        label="Ability source"
        label1="Trash"
        label2="Boss"
        enabled={enemyAbilityDetails.isBossAbility}
        setIsEnabled={setField('isBossAbility')}
      />
      <OnOffStateSelector
        label="Damage type"
        label1="Magic"
        label2="Physical"
        enabled={!!enemyAbilityDetails.isPhysical}
        setIsEnabled={setField('isPhysical')}
      />
      <Toggle
        label="AoE damage"
        checked={enemyAbilityDetails.isAoe}
        onChange={setField('isAoe')}
      />
    </div>
  )
}
