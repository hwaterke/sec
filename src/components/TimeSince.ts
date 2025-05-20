import {useEffect, useState} from 'react'
import {Temporal} from 'temporal-polyfill'
import {formatTimeBetween} from '../utils/formatters'

export const TimeSince = ({timestamp}: {timestamp: number}) => {
  const [now, setNow] = useState(() => Temporal.Now.instant())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Temporal.Now.instant())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const timestampInstant = Temporal.Instant.fromEpochMilliseconds(
    timestamp * 1_000
  )
  return formatTimeBetween(
    timestampInstant.epochMilliseconds / 1_000,
    now.epochMilliseconds / 1_000
  )
}
