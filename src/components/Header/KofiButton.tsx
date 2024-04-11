import { Label } from '../Common/Label'
import kofi from '../../public/kofi.svg'

export function KofiWidget() {
  return (
    <a
      href="https://ko-fi.com/ortemis"
      target="_blank"
      rel="noreferrer"
      className="hidden sm:block"
    >
      <Label className="hover:bg-teal-700 gap-1 px-2 py-1.5">
        <img alt="kofi" src={kofi} width={25} />
        Donate
      </Label>
    </a>
  )
}
