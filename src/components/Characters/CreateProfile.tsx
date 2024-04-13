import { TooltipStyled } from '../Common/TooltipStyled'
import { FormEvent, useRef, useState } from 'react'
import { Input } from '../Inputs/Input'
import { TooltipRefProps } from 'react-tooltip'
import { Button } from '../Common/Button'

interface Props {
  idx: number
  createProfile: (charIndex: number, name: string) => void
}

export function CreateProfile({ idx, createProfile }: Props) {
  const [name, setName] = useState('')
  const tooltipRef = useRef<TooltipRefProps>(null)

  const save = () => {
    if (name === '') return
    createProfile(idx, name)
    setName('')
    tooltipRef.current?.close()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    save()
  }

  return (
    <div>
      <div
        className="cursor-pointer text-teal-500 select-none"
        data-tooltip-id={`create-profile-${idx}`}
        onClick={() =>
          tooltipRef.current?.isOpen
            ? tooltipRef.current?.close()
            : tooltipRef.current?.open()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <TooltipStyled id={`create-profile-${idx}`}>Create new profile</TooltipStyled>
      <TooltipStyled
        id={`create-profile-${idx}`}
        ref={tooltipRef}
        imperativeModeOnly
        place="bottom"
        clickable
        style={{ width: 250 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 items-start w-full">
            <Input
              value={name}
              onChange={setName}
              label="Profile name"
              fullWidth
              autoFocus
            />
            <Button short onClick={save}>
              Create profile
            </Button>
          </div>
        </form>
      </TooltipStyled>
    </div>
  )
}
