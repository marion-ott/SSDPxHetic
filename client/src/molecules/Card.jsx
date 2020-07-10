import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Title, Initials } from '../atoms'
import notificationContext from '../context/notificationContext'
import { useEffect } from 'react'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(98.1deg, #5d59d6 28.84%, #6f6be5 96.46%);
  border-radius: 8px;
  margin: 8px 0 0 0;
  padding-bottom: 10px;
  color: #fff;

  :first-child {
    margin: 0;
  }

  :last-child {
    margin: 8px 0;
  }

  div.inner_ctn {
    padding: 16px 10px 0 16px;
  }
  p {
    font-size: 14px;
    opacity: 0.8;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &.team {
      text-align: right;
    }
  }
  i {
    font-size: 18px;
    color: #fff;
    position: absolute;
    cursor: pointer;
    top: 15px;
    right: 10px;
  }
`

export default ({ visitId, status, team, ...hotel }) => {
  const { notifications } = useContext(notificationContext)
  const [newStatus, setNewStatus] = useState(status)

  useEffect(() => {
    if (notifications.length > 0) {
      const lastItem = _.last(notifications)
      if (
        lastItem.visit.data.id === visitId &&
        lastItem.visit.data.status !== newStatus
      ) {
        setNewStatus(lastItem.visit.data.status)
      }
    }
  }, [notifications])

  return (
    <Card>
      <div className='inner_ctn'>
        <Title color='white' classProp='is-6 modal-card-title' tag='h5'>
          {hotel.name}
        </Title>
        <p>{hotel.rooms} chambres à visiter</p>
        <p>
          {hotel.address},<br />
          {hotel.zipCode} {hotel.city}
        </p>
        <br />
        <Initials users={team.users} />
        <p>
          {newStatus === 'DONE'
            ? 'Visite terminée'
            : newStatus === 'UPCOMING'
            ? 'À venir'
            : 'En cours'}
        </p>
      </div>
    </Card>
  )
}
