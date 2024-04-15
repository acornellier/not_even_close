import { Image } from './Image.tsx'

interface Props {
  icon: string
  size: number
}

export function WowIcon({ icon, size }: Props) {
  return (
    <Image
      className="rounded border border-gray-500"
      size={size}
      src={`https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`}
      alt={icon}
    />
  )
}
