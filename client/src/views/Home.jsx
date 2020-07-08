import React, { useState, useEffect, useContext } from 'react'
import Board, { onCardClick, onDataChange } from 'react-trello'
import dateContext from '../context/dateContext'
import appContext from '../context/appContext'
import useGetVisits from '../hooks/useGetVisits'
import { TableHead, Card } from '../molecules'
import { Title } from '../atoms'
import { formatDate } from '../utils'

export default () => {
  const [planningId, setPlanningId] = useState(null)
  const [draggablePlanning, setDraggablePlanning] = useState(null)
  // const [loading, setLoading] = useState(true)
  const { context } = useContext(appContext)
  const { today } = useContext(dateContext)
  const [selected, setSelected] = useState(today)

  const { loading, error, data } = useGetVisits(
    context.teamId,
    formatDate(selected),
    [selected]
  )
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    if (data) {
      console.log(data)
      setVisits(data.myVisits)
    }
  }, [data])

  const format = (array) => {
    const planningFormatted = {
      lanes: []
    }
    array.lanes.forEach((lane, i) => {
      let newLane = {}
      newLane.id = `lane${i}`
      newLane.cards = lane
      newLane.cards.forEach((card) => {
        card.id = card.visit_id
      })
      planningFormatted.lanes.push(newLane)
    })
    return planningFormatted
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

  return (
    <section className='section'>
      <Title classProp='is-1' tag='h1'>
        planning
      </Title>

      <div className='Planning'>
        <TableHead />
        {/* {loading ? (
          <p>loading</p>
        ) : (
          <Board
            style={boardStyle}
            components={{
              Card: Card
            }}
            laneDraggable={false}
            onDataChange={onDataChange}
            onCardDelete={onCardDelete}
            data={draggablePlanning}
          />
        )} */}
      </div>
    </section>
  )
}
