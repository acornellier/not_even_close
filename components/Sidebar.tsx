import { ResultsFull } from './Results/ResultsFull'
import { ResultsMini } from './Results/ResultsMini'
import { Instructions } from './Results/Instructions'
import { Result } from '../backend/sim'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
  ssr: false,
})

interface Props {
  result: Result
}

export function Sidebar({ result }: Props) {
  const [isTwitchLoaded, setIsTwitchLoaded] = useState(false)

  return (
    <div className="sm:sticky sm:top-10">
      {result.main.characters.length === 1 ? (
        <ResultsFull result={result.main} />
      ) : (
        <ResultsMini result={result.main} />
      )}

      <div className="border-2 my-4 dark:border-gray-600" />

      <div className={isTwitchLoaded ? '' : 'hidden'}>
        <ReactTwitchEmbedVideo
          layout="video"
          channel="ortemismw"
          width={400}
          height={400 * (9 / 16)}
          muted
          onPlay={() => setIsTwitchLoaded(true)}
        />

        <div className="border-2 my-4 dark:border-gray-600" />
      </div>

      <Instructions />
    </div>
  )
}
