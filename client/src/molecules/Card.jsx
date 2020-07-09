import React from 'react'
import styled from 'styled-components'
import { Icon, Title } from '../atoms'

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
    padding: 16px 10px 10px 16px;
  }
  p {
    font-size: 14px;
    opacity: 0.8;
    &:not(:last-child) {
      margin-bottom: 5px;
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

export default ({ team, ...hotel }) => {
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
        {team.users.map((user, i) => (
          <p className='team' key={i}>
            {user.firstName} {user.lastName}
          </p>
        ))}
      </div>
    </Card>
  )
}
