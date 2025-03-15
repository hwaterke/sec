import {Temporal} from 'temporal-polyfill'

export const formatEpochTimestamp = (timestamp: number) => {
  const instant = Temporal.Instant.fromEpochSeconds(timestamp)
  const now = Temporal.Now.zonedDateTimeISO()

  const timestampDate = instant
    .toZonedDateTimeISO(now.getTimeZone())
    .toPlainDate()
  const todayDate = now.toPlainDate()

  if (Temporal.PlainDate.compare(timestampDate, todayDate) === 0) {
    // If it's today, only show time
    return instant.toLocaleString(undefined, {timeStyle: 'short'})
  } else {
    // If it's not today, show full date and time
    return instant.toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }
}

export const formatEpochTime = (timestamp: number) => {
  const instant = Temporal.Instant.fromEpochSeconds(timestamp)
  return instant.toLocaleString(undefined, {timeStyle: 'short'})
}

export const formatDate = (isoDate: string) => {
  const date = Temporal.PlainDate.from(isoDate)
  return date.toLocaleString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatTimeBetween = (
  timestampStart: number,
  timestampEnd: number
) => {
  // Calculate the absolute difference in seconds
  const diffSeconds = Math.abs(timestampEnd - timestampStart)

  // Compute hours, minutes, seconds
  const hours = Math.floor(diffSeconds / 3600)
  const minutes = Math.floor((diffSeconds % 3600) / 60)
  const seconds = diffSeconds % 60

  // Create a human-readable string
  return `${hours}h ${minutes}m ${seconds}s`
}

export const epochFromDateAndTime = (dateISO: string, timeISO: string) => {
  const date = Temporal.PlainDate.from(dateISO)
  const time = Temporal.PlainTime.from(timeISO)
  const plainDateTime = date.toPlainDateTime(time)
  const timeZone = Temporal.Now.zonedDateTimeISO().getTimeZone()
  const zonedDateTime = plainDateTime.toZonedDateTime(timeZone)
  return zonedDateTime.epochSeconds
}
