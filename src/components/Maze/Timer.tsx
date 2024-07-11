import { useEffect, useState } from 'react'

const getMilliseconds = (millis: number) => {
  return Math.floor(millis % 1000)
}

const getSeconds = (millis: number) => {
  return Math.floor(millis / 1000)
}

interface Props {
  startTime: DOMHighResTimeStamp | null
  endTime: DOMHighResTimeStamp | null
}

export function Timer({ startTime, endTime }: Props) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (startTime == null) return

    const interval = setInterval(() => {
      const currentTimestamp = performance.now()
      setElapsed(currentTimestamp - startTime)
    }, 1)

    return () => {
      clearInterval(interval)
    }
  }, [startTime])

  const actualElapsed = startTime == null ? 0 : endTime ? endTime - startTime : elapsed
  return (
    <div className="text-lg">
      {getSeconds(actualElapsed)}.
      {getMilliseconds(actualElapsed).toString().padEnd(3, '0')} sec
    </div>
  )
}
