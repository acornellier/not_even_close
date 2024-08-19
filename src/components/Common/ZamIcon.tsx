import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { forwardRef } from 'react'

interface Props
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  icon: string
  size: number
}

export const ZamIcon = forwardRef<HTMLImageElement, Props>(
  ({ alt, size, icon, ...props }, ref) => {
    return (
      <img
        {...props}
        ref={ref}
        alt={alt}
        width={size}
        height={size}
        src={`https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg`}
      />
    )
  },
)

ZamIcon.displayName = 'Image'
