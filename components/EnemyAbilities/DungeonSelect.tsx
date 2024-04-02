import { DungeonKey, dungeons, isSeason4 } from '../../backend/dungeons'
import Image from 'next/image'
import { Button } from '../Common/Button'

interface Props {
  setSelectedDungeon: (dungeon: DungeonKey) => void
  isBeta: boolean
}

export function DungeonSelect({ setSelectedDungeon, isBeta }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {dungeons
        .filter(({ key }) => isSeason4(key) === isBeta)
        .map(({ key, name, icon }) => (
          <Button
            key={key}
            bigText
            className="flex gap-2 py-2 px-2"
            onClick={() => setSelectedDungeon(key)}
          >
            <Image
              className="rounded border-2 border-gray-600"
              height={36}
              width={36}
              src={`https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`}
              alt={name}
            />
            {name}
          </Button>
        ))}
    </div>
  )
}
