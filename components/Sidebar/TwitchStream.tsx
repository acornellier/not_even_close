import { memo, useCallback, useState } from 'react'
import { Button } from '../Common/Button'
import Script from 'next/script'

const channel = 'woxtoxic'
const videoWidth = 400
const videoHeight = videoWidth * (9 / 16)
const chatHeight = 400

function TwitchStreamComponent() {
  const [isTwitchVisible, setTwitchVisible] = useState(false)
  const [isChatExpanded, setChatExpanded] = useState(false)

  const onLoadTwitchScript = useCallback(() => {
    const player = new Twitch.Embed('twitch-embed', {
      width: videoWidth,
      height: videoHeight,
      channel,
      layout: 'video',
      autoplay: true,
      muted: true,
      theme: 'dark',
      parent: [window.location.hostname],
    })

    player.addEventListener(Twitch.Player.READY, initiate)

    function initiate() {
      player.addEventListener(Twitch.Player.ONLINE, handleOnline)
      player.addEventListener(Twitch.Player.OFFLINE, handleOffline)
      player.removeEventListener(Twitch.Player.READY, initiate)
    }

    function handleOnline() {
      setTwitchVisible(true)
      player.removeEventListener(Twitch.Player.ONLINE, handleOnline)
      player.addEventListener(Twitch.Player.OFFLINE, handleOffline)
    }

    function handleOffline() {
      setTwitchVisible(false)
      player.removeEventListener(Twitch.Player.OFFLINE, handleOffline)
      player.addEventListener(Twitch.Player.ONLINE, handleOnline)
    }
  }, [])

  return (
    <>
      <div className={isTwitchVisible ? '' : 'hidden'}>
        <div id="twitch-embed" />
        {isChatExpanded && (
          <iframe
            src={`https://www.twitch.tv/embed/${channel}/chat?darkpopout&parent=${
              typeof window === undefined ? '' : window.location.hostname
            }`}
            height={chatHeight}
            width={videoWidth}
          />
        )}
        <div className="flex flex-col items-center">
          <Button
            short
            onClick={() => setChatExpanded(!isChatExpanded)}
            className="rounded-t-none"
          >
            {isChatExpanded ? 'Hide' : 'Show'} chat
          </Button>
        </div>
        <div className="border-2 my-4 border-gray-600 grow" />
      </div>
      <Script src="/twitch_v1.js" onLoad={onLoadTwitchScript} />
    </>
  )
}

export const TwitchStream = memo(TwitchStreamComponent)
