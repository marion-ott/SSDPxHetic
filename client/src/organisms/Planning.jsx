import React from 'react'
import styled from 'styled-components'
import { TableHead, Card } from '../molecules'

const PlanningWrapper = styled.section`
  background-color: white;
  border-radius: 8px;
  border: solid 1px #f3f3f3;
`

const Planning = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 0;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  > * {
    padding: 14px;
    border-top: solid 1px #f3f3f3;
    border-right: solid 1px #f3f3f3;

    :last-child {
      border-right: none;
    }
  }
`

export default ({ visits, date }) => {
  return (
    <PlanningWrapper>
      <TableHead date={date} />
      <Planning>
        {Object.keys(visits).map((key, index) => (
          <div key={index}>
            {visits[key].map(({ id, status, hotel, team }) => (
              <Card
                key={id}
                visitId={id}
                status={status}
                team={team}
                {...hotel}
              />
            ))}
          </div>
        ))}
      </Planning>
    </PlanningWrapper>
  )
}
