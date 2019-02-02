import moment from 'moment'

export const isoDateToHuman = date =>
  moment(date, 'YYYY-MM-DD').format('dddd, D MMMM')

export const daysSince = date => {
  const duration = moment.duration(
    moment().diff(moment(date, 'YYYY-MM-DD HH:mm:ss'))
  )
  return Math.floor(duration.asDays())
}
