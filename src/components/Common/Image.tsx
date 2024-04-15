import { DetailedHTMLProps, forwardRef, ImgHTMLAttributes } from 'react'
import { isDev } from '../../util/env.ts'
import vercelConfig from '../../../vercel.json'

interface Props
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string
  size: number
}

const allowedSizes = vercelConfig.images.sizes

export const Image = forwardRef<HTMLImageElement, Props>((props, ref) => {
  if (!allowedSizes.includes(props.size)) {
    console.error(`Image size not configured in vercel: ${props.size}`)
  }

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
          : `/_vercel/image?url=${encodeURIComponent(props.src)}&w=${props.size}&q=100`
      }
    />
  )
})

Image.displayName = 'Image'
