import Image from 'next/image'
import { Label } from '../Inputs/Label'

export function KofiWidget() {
  return (
    <a href="https://ko-fi.com/ortemis" target="_blank" rel="noreferrer">
      <Label className="hover:bg-teal-800 dark:hover:bg-teal-700 gap-1 px-2 py-1.5">
        <Image src="/kofi.png" alt="Ko-fi donations" width={20} height={20} />
        Donate
      </Label>
    </a>
  )
}
