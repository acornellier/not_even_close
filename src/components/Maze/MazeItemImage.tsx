import type { MazeItem } from './mazeUtil.ts'

const imageSize = 150

export function MazeItemImage({ item }: { item: MazeItem }) {
  const code = item.map((v) => (v ? 1 : 0)).join('')
  return (
    <div
      className="relative cursor-pointer group maze-image"
      style={{ height: imageSize, width: imageSize }}
    >
      <img
        className="blur-lg grayscale-[0.5] group-hover:grayscale-0"
        alt={code}
        src={`/maze/${code}.png`}
      />
      <img alt={code} src={`/maze/${code}.png`} />
      <div
        className="group-hover:hidden"
        style={{
          backgroundImage: "url('/maze/fog.avif')",
        }}
      />
    </div>
  )
}
