import { Label } from '../Inputs/Label'

interface Props {
  moreShown: boolean
  setMoreShown: (val: boolean) => void
}

export function MoreLess({ moreShown, setMoreShown }: Props) {
  return (
    <Label short className="cursor-pointer" onClick={() => setMoreShown(!moreShown)}>
      {moreShown ? 'Less' : 'More'}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        {moreShown ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        )}
      </svg>
    </Label>
  )
}
