import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { forwardRef } from 'react'
import { isDev } from '../../util/env.ts'

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
      src={
        isDev
          ? props.src
          : `/_vercel/image?url=${encodeURIComponent(props.src)}&w=56&q=100`
      }
    />
  )
})

ZamIcon.displayName = 'Image'
