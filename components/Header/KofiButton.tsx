import { Label } from '../Inputs/Label'
import kofi from '../../public/kofi.svg'
import Image from 'next/image'

export function KofiWidget() {
  return (
    <a
      href="https://ko-fi.com/ortemis"
      target="_blank"
      rel="noreferrer"
      className="hidden sm:block"
    >
      <Label className="hover:bg-teal-800 dark:hover:bg-teal-700 gap-1 px-2 py-1.5">
        <Image alt="kofi" src={kofi} width={25} />
        Donate
      </Label>
    </a>
  )
}
