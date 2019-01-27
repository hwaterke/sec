import moment from 'moment'

export const isoDateToHuman = date =>
  moment(date, 'YYYY-MM-DD').format('dddd, D MMMM')
