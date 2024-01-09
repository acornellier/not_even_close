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
  const setBaseDamage = (baseDamage: number) =>
    setEnemyAbilityDetails({ ...enemyAbilityDetails, baseDamage })

  const setIsBossAbility = (isBossAbility: boolean) =>
    setEnemyAbilityDetails({ ...enemyAbilityDetails, isBossAbility })

  const setIsAoe = (isAoe: boolean) =>
    setEnemyAbilityDetails({ ...enemyAbilityDetails, isAoe })

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
        setIsEnabled={setIsBossAbility}
      />
      <Toggle
        label="AoE damage"
        checked={enemyAbilityDetails.isAoe}
        onChange={setIsAoe}
      />
    </div>
  )
}
