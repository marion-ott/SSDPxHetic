import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import dateContext from '../context/dateContext'
import appContext from '../context/appContext'
import useGetVisits from '../hooks/useGetVisits'
import { Calendar, Planning, Filters } from '../organisms'
import { TableHead, Card } from '../molecules'
import { Title, Loader } from '../atoms'
import { formatDate, getWeek } from '../utils'
import _ from 'lodash'

export default () => {
  const { context } = useContext(appContext)
  const { today } = useContext(dateContext)
  const [selected, setSelected] = useState(today)

  const { loading, error, data } = useGetVisits(
    context.teamId,
    getWeek(selected),
    [selected]
  )
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    if (data) {
      const formattedVisits = _.groupBy(data.visits, 'date')
      setVisits(formattedVisits)
    }
  }, [loading, error, data])

  const onDateChange = (date) => {
    const newDate = getWeek(formatDate(moment(date)))
    setSelected(date)
  }

  return (
    <section className='section'>
      <Title classProp='is-1' tag='h1'>
        Le planning par semaine
      </Title>
      {loading ? (
        <Loader />
      ) : (
        <div className='planningWrapper'>
          <div className='DatePickerWrapper'>
            <div style={{ height: '290px' }}>
              <div className='DatePicker'>
                <Calendar onChange={onDateChange} />
              </div>
            </div>
            <Filters />
          </div>
          <div className='Planning'>
            {visits ? (
              <Planning date={selected} visits={visits} />
            ) : (
              <p>loading</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
