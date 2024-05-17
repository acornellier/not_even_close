import kofi from '../../../public/kofi.svg'
import { Button } from '../Common/Button.tsx'

export function KofiWidget() {
  return (
    <a
      href="https://ko-fi.com/ortemis"
      target="_blank"
      rel="noreferrer"
      className="hidden sm:block"
    >
      <Button short className="gap-1">
        <img alt="kofi" src={kofi} width={25} />
        Donate
      </Button>
    </a>
  )
}
