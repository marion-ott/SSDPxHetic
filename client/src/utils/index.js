import moment from 'moment'

const getDateStr = (date) => {
  return date.toISOString().slice(0, 10)
}

const getWeek = (date) => {
  const start = formatDate(moment(date).startOf('week'))
  const end = formatDate(moment(date).endOf('week'))
  return { start, end }
}

const formatDate = (date) =>
  `${moment(date).startOf('day').format('YYYY-MM-DD')}T00:00:00.000Z`

export { getDateStr, formatDate, getWeek }
