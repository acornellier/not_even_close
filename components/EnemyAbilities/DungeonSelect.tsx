import { Dungeon, dungeonIcons, dungeons } from '../../backend/dungeons'
import Image from 'next/image'
import { Button } from '../Common/Button'

interface Props {
  setSelectedDungeon: (dungeon: Dungeon) => void
}

export function DungeonSelect({ setSelectedDungeon }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {dungeons.map((dungeon) => (
        <Button
          key={dungeon}
          bigText
          className="flex gap-2 py-2 px-2"
          onClick={() => setSelectedDungeon(dungeon)}
        >
          <Image
            className="rounded border-2 border-gray-600"
            height={36}
            width={36}
            src={`https://wow.zamimg.com/images/wow/icons/large/${dungeonIcons[dungeon]}.jpg`}
            alt={dungeon}
          />
          {dungeon}
        </Button>
      ))}
    </div>
  )
}
