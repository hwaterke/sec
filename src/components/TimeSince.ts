import {DateTime} from 'luxon'
import {useEffect, useState} from 'react'

export const TimeSince = ({date}: {date: DateTime}) => {
  const [time, setTime] = useState(DateTime.local())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.local())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const diff = time.diff(date, ['days', 'hours', 'minutes', 'seconds'])
  const days = diff.days
  const hours = diff.hours
  const minutes = diff.minutes
  const seconds = Math.round(diff.seconds)

  if (days > 0) {
    return `${days} days`
  } else if (hours > 0) {
    return `${hours} hours`
  } else if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, '0')}`
  } else {
    return `${seconds} seconds`
  }
}
