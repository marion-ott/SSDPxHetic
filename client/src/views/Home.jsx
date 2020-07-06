import React, { useState, useContext, useEffect } from 'react'
import Board, { onCardClick, onDataChange } from 'react-trello'
import useGetVisits from '../hooks/useGetVisits'
import { TableHead, Card } from '../molecules'
import { Title } from '../atoms'

export default () => {
  const [planningId, setPlanningId] = useState(null)
  const [draggablePlanning, setDraggablePlanning] = useState(null)
  const [loading, setLoading] = useState(true)

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
        {loading ? (
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
        )}
      </div>
    </section>
  )
}
