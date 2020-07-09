import React, { useState, useEffect, useContext } from 'react'
import Board, { onCardClick, onDataChange } from 'react-trello'
import moment from 'moment'
import dateContext from '../context/dateContext'
import appContext from '../context/appContext'
import useGetVisits from '../hooks/useGetVisits'
import { Calendar } from '../organisms'
import { TableHead, Card } from '../molecules'
import { Title } from '../atoms'
import { formatDate, getWeek } from '../utils'
import _ from 'lodash'

export default () => {
  const [planningId, setPlanningId] = useState(null)
  const [draggablePlanning, setDraggablePlanning] = useState(null)
  // const [loading, setLoading] = useState(true)
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
      const formattedVisits = format(_.groupBy(data.visits, 'date'))
      setVisits(formattedVisits)
    }
  }, [data])

  const format = (visits) => {
    const planning = {
      lanes: []
    }

    Object.keys(visits).forEach((date, index) => {
      let newLane = {}
      newLane.id = `lane${index}`
      newLane.cards = visits[date]
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
    const newDate = getWeek(formatDate(moment(date)))
    setSelected(newDate)
  }

  return (
    <section className='section'>
      <Title classProp='is-1' tag='h1'>
        planning {visits && visits.length}
      </Title>
      <Calendar onChange={onDateChange} />
      <div className='Planning'>
        <TableHead />
        {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {visits &&
            visits.map(({ hotel }, index) => {
              return (
                <div key={index}>
                  <p>{hotel.name}</p>
                </div>
              )
            })}
        </div> */}
        {visits ? (
          <Board
            style={boardStyle}
            components={{
              Card: Card
            }}
            laneDraggable={false}
            onDataChange={onDataChange}
            onCardDelete={onCardDelete}
            data={visits}
          />
        ) : (
          <p>loading</p>
        )}
      </div>
    </section>
  )
}
