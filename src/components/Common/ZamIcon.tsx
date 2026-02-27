import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { forwardRef } from 'react'

interface Props
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  icon: string
  size: number
}

const useWowDb = false
function getUrl(icon: string) {
  if (useWowDb) {
    return `https://icons.wowdb.com/retail/large/${icon}.jpg`
  }

  return `https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`
}

export const ZamIcon = forwardRef<HTMLImageElement, Props>(
  ({ alt, size, icon, ...props }, ref) => {
    icon = icon.replace('-', '_')
    return (
      <img {...props} ref={ref} alt={alt} width={size} height={size} src={getUrl(icon)} />
    )
  },
)

ZamIcon.displayName = 'Image'
