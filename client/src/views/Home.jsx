import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import dateContext from '../context/dateContext'
import appContext from '../context/appContext'
import useGetVisits from '../hooks/useGetVisits'
import { Calendar, Planning, Filters } from '../organisms'
import { TableHead, Card } from '../molecules'
import { Title } from '../atoms'
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
    console.log(data)
    if (data) {
      const formattedVisits = _.groupBy(data.visits, 'date')
      setVisits(formattedVisits)
    }
  }, [loading, error, data])

  const format = (visits) => {
    const planning = {
      lanes: []
    }

    Object.keys(visits).forEach((date, index) => {
      let newLane = {}
      newLane.id = `lane${index}`
      newLane.visits = visits[date]
      planning.lanes.push(newLane)
    })
    return planning
  }

  const boardStyle = {
    backgroundColor: '#FFFFFF'
  }

  const onDataChange = async (lanes) => {
    // update visit
  }

  const onCardDelete = (id) => {
    console.log(id)
  }

  const onDateChange = (date) => {
    console.log(date)
    const newDate = getWeek(formatDate(moment(date)))
    setSelected(newDate)
  }

  return (
    <section className='section'>
      <Title classProp='is-1' tag='h1'>
        Le planning par semaine
      </Title>
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
    </section>
  )
}
