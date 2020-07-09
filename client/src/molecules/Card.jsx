import React from 'react'
// import Icon from '../atoms/Icon'

export default ({ onDelete, id, hotel }) => {
  const minToHours = (num) => {
    var hours = Math.floor(num / 60)
    var minutes = num % 60
    if (hours === 0) {
      return minutes + ' minutes'
    }
    return hours + 'h' + minutes
  }

  const dontDelete = (e) => {
    // console.log(e)
    e.stopPropagation()
  }

  return (
    <div className='Card' key={id} onClick={() => onDelete()}>
      <div className='inner_ctn' onClick={dontDelete}>
        <p>{hotel.name}</p>
        <p>{hotel.rooms}</p>
        <br />
        {/* {props.team.map((el, i) => (
          <p className='team' key={i}>
            {el.firstName} {el.lastName}
          </p>
        ))} */}
      </div>

      {/* <Icon
        iconColor={({ theme: { variables } }) => variables.white}
        size={20}
        type={`trash`}
      /> */}
    </div>
  )
}
