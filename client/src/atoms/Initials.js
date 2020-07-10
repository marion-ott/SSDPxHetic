import React from 'react'

export default ({ users }) => {
  return (
    <div className='initials'>
      {users.map((user, index) => (
        <div
          key={index}
          className='initialsItem'
          style={{ transform: `translateX(-${index * 65}%)` }}>
          <p>
            {user.firstName[0]} {user.lastName[0]}
          </p>
        </div>
      ))}
    </div>
  )
}
