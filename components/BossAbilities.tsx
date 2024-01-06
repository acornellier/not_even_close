import { bossAbilitiesByDungeon, BossAbility } from '../backend/bossAbilities'
import Image from 'next/image'

interface Props {
  onSelect: (bossAbility: BossAbility) => void
}

export function BossAbilities({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-start gap-2">
      {bossAbilitiesByDungeon.map(({ dungeon, abilities }) => (
        <div key={dungeon}>
          <span className="text-l font-bold">{dungeon}</span>
          <div className="flex flex-row items-start gap-x-2 gap-y-1 flex-wrap">
            {abilities.map((ability) => (
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
