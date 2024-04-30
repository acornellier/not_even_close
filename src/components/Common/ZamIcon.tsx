import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { forwardRef } from 'react'

interface Props
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string
  size: number
}

export const ZamIcon = forwardRef<HTMLImageElement, Props>((props, ref) => {
  return (
    <img
      {...props}
      ref={ref}
      alt={props.alt}
      width={props.size}
      height={props.size}
      src={props.src}
    />
  )
})

ZamIcon.displayName = 'Image'
