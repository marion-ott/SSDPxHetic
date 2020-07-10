import React, { useState, useEffect, useContext } from 'react'
import dateContext from '../context/dateContext'
import appContext from '../context/appContext'
import sectorContext from '../context/sectorContext'
import useGetVisits from '../hooks/useGetVisits'
import { Calendar, Planning, Filters } from '../organisms'
import { Title, Loader } from '../atoms'
import { getWeek } from '../utils'
import _ from 'lodash'

export default () => {
  const { context } = useContext(appContext)
  const { today } = useContext(dateContext)
  const { sectors } = useContext(sectorContext)
  const [selected, setSelected] = useState(today)
  const [sectorSelected, setSectorSelected] = useState()

  const { loading, error, data } = useGetVisits(
    context.teamId,
    getWeek(selected),
    [selected]
  )
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    setSectorSelected(sectors[0].id)
  }, [])

  useEffect(() => {
    if (data) {
      const formattedVisits = _.groupBy(data.visits, 'date')
      setVisits(formattedVisits)
    }
  }, [loading, error, data])

  const onDateChange = (date) => {
    setSelected(date)
  }

  const onSectorChange = (sector) => {
    setSectorSelected(sector.id)
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
                <Calendar selected={selected} onChange={onDateChange} />
              </div>
            </div>
            <Filters
              onSectorChange={onSectorChange}
              sectorSelected={sectorSelected}
              setSectorSelected={setSectorSelected}
            />
          </div>
          <div className='Planning'>
            {visits ? (
              <Planning
                sectorSelected={sectorSelected}
                date={selected}
                visits={visits}
              />
            ) : (
              <p>loading</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
