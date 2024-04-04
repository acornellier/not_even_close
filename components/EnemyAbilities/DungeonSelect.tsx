import { DungeonKey, dungeons, isSeason4 } from '../../backend/dungeons'
import { Button } from '../Common/Button'
import { WowIcon } from '../Common/WowIcon'

interface Props {
  setSelectedDungeon: (dungeon: DungeonKey) => void
  isBeta: boolean
}

export function DungeonSelect({ setSelectedDungeon, isBeta }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {dungeons
        .filter(({ key }) => isSeason4(key) === isBeta)
        .map(({ key, name, icon }) => (
          <Button
            key={key}
            bigText
            className="flex gap-2 py-2 px-2"
            onClick={() => setSelectedDungeon(key)}
          >
            <WowIcon icon={icon} size={36} />
            {name}
          </Button>
        ))}
    </div>
  )
}
