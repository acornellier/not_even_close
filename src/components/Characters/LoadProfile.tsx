import { TooltipStyled } from '../Common/TooltipStyled'
import type { Profile } from '../../backend/characters'
import { SpecIcon } from '../Common/SpecIcon'
import { useRef } from 'react'
import type { TooltipRefProps } from 'react-tooltip'
import { Button } from '../Common/Button'

interface Props {
  idx: number
  profiles: Profile[]
  loadedProfileId: string | undefined
  loadProfile: (profile: Profile | null) => void
  deleteProfile: (profileId: string) => void
}

export function LoadProfile({
  idx,
  profiles,
  loadedProfileId,
  loadProfile,
  deleteProfile,
}: Props) {
  const tooltipRef = useRef<TooltipRefProps>(null)

  if (!profiles.length) return null

  return (
    <div>
      <div
        className="cursor-pointer text-teal-500 select-none"
        data-tooltip-id={`load-character-${idx}`}
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
            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
          />
        </svg>
      </div>
      <TooltipStyled id={`load-character-${idx}`}>Load profile</TooltipStyled>
      <TooltipStyled
        id={`load-character-${idx}`}
        ref={tooltipRef}
        imperativeModeOnly
        place="bottom"
        clickable
        style={{ minWidth: 300 }}
      >
        <div className="flex flex-col gap-2 items-center w-full">
          {profiles.map((profile) => {
            const isLoaded = loadedProfileId && loadedProfileId === profile.id
            return (
              <div
                key={profile.id}
                className="flex justify-between gap-2 items-center w-full"
              >
                <div className="flex gap-2 items-center">
                  <SpecIcon
                    wowClass={profile.classSpec.class}
                    spec={profile.classSpec.spec}
                    size={20}
                  />
                  <div className={isLoaded ? 'font-bold' : ''}>{profile.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  {isLoaded ? (
                    <Button short onClick={() => loadProfile(null)}>
                      Unload
                    </Button>
                  ) : (
                    <Button short onClick={() => loadProfile(profile)}>
                      Load
                    </Button>
                  )}
                  <Button short onClick={() => deleteProfile(profile.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </TooltipStyled>
    </div>
  )
}
