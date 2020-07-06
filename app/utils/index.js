import moment from 'moment'

const getDateStr = (date) => {
  return date.toISOString().slice(0, 10)
}

const formatDate = (date) =>
  `${moment(date).startOf('day').format('YYYY-MM-DD')}T00:00:00.000Z`

export { getDateStr, formatDate }
