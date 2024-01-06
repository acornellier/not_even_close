import {
  bossAbilitiesByDungeon,
  BossAbility,
  DungeonAbilities,
} from '../backend/bossAbilities'
import Image from 'next/image'
import { AbilitySettings } from './Simulator'

interface Props {
  setAbilitySettings: (abilitySettings: AbilitySettings) => void
}

export function BossAbilities({ setAbilitySettings }: Props) {
  const onSelect = (ability: BossAbility) => {
    setAbilitySettings({
      selectedDungeon: null,
      hits: [
        {
          baseDamage: ability.damage,
          isAoe: ability.isAoe,
          bossAbility: ability,
        },
      ],
    })
  }

  const onSelectDungeon = (dungeonAbilities: DungeonAbilities) => {
    setAbilitySettings({
      selectedDungeon: dungeonAbilities.dungeon,
      hits: dungeonAbilities.abilities.map((ability) => ({
        baseDamage: ability.damage,
        isAoe: ability.isAoe,
        bossAbility: ability,
      })),
    })
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {bossAbilitiesByDungeon.map((dungeonAbilities) => (
        <div key={dungeonAbilities.dungeon}>
          <span
            className="text-l font-bold cursor-pointer"
            onClick={() => onSelectDungeon(dungeonAbilities)}
          >
            {dungeonAbilities.dungeon}
          </span>
          <div className="flex flex-row items-start gap-x-2 gap-y-1 flex-wrap">
            {dungeonAbilities.abilities.map((ability) => (
              <a
                key={ability.name}
                href={ability.wowheadLink}
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(ability)
                }}
              >
                <div className="flex items-center gap-1">
                  <Image
                    className="rounded border border-gray-500"
                    height={24}
                    width={24}
                    src={`https://wow.zamimg.com/images/wow/icons/large/${ability.iconName}.jpg`}
                    alt={ability.name}
                  />
                  {ability.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
