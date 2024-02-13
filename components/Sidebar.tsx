﻿import { ResultsFull } from './Results/ResultsFull'
import { ResultsMini } from './Results/ResultsMini'
import { Instructions } from './Results/Instructions'
import { KeyDetails, Result } from '../backend/sim'
import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import { EnemyAbility } from '../backend/dungeons'

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
  ssr: false,
})

interface Props {
  result: Result
  enemyAbility: EnemyAbility | null
  keyDetails: KeyDetails
}

function TwitchStream() {
  const [isTwitchLoaded, setIsTwitchLoaded] = useState(false)

  return (
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
  )
}

const TwitchStreamMemo = memo(TwitchStream)

export function Sidebar({ result, enemyAbility, keyDetails }: Props) {
  return (
    <div className="sm:sticky sm:top-10">
      {result.main.characters.length === 1 ? (
        <ResultsFull
          result={result.main}
          enemyAbility={enemyAbility}
          keyDetails={keyDetails}
        />
      ) : (
        <ResultsMini
          result={result.main}
          enemyAbility={enemyAbility}
          keyDetails={keyDetails}
        />
      )}

      <div className="border-2 my-4 dark:border-gray-600" />

      <TwitchStreamMemo />

      <Instructions />
    </div>
  )
}
