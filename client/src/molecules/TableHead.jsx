import React, { useState } from 'react'
import styled from 'styled-components'
import { formatDate, getWeek, getDateStr } from '../utils'
import momentjs from 'moment/min/moment-with-locales'
import { extendMoment } from 'moment-range'
import { useEffect } from 'react'
const moment = extendMoment(momentjs)

const TableHead = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 0;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .date {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    text-align: center;
    padding: 20px 0;
    border-right: solid 1px #f3f3f3;

    :last-child {
      border-right: none;
    }
  }

  .date p {
    font-size: 16px;
    line-height: 21px;
    font-weight: 600;
  }
`

export default ({ date }) => {
  const [days, setDays] = useState([])

  useEffect(() => {
    const { start, end } = getWeek(date)
    const range = moment.range(start, end)
    const state = []
    for (let day of range.by('day')) {
      const date = day.format('YYYY-MM-DD')
      if (moment(date).day() !== 0 && moment(date).day() !== 6) {
        state.push(date)
      }
    }
    setDays(state)
  }, [DataTransfer])

  return (
    <TableHead>
      {days.map((day) => (
        <div className='date'>
          <p>{moment(day).locale('fr').format('dddd Do MMMM')}</p>
        </div>
      ))}
    </TableHead>
  )
}
