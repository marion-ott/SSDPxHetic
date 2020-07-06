import React from 'react'
// import Icon from '../atoms/Icon'
// import Details from './../molecules/Details'

export default (props) => {
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
    <div className='Card' key={props._id} onClick={() => props.onDelete()}>
      <div className='inner_ctn' onClick={dontDelete}>
        {/* <Details
          hotel={props.hotel_name}
          anomaly={`Note actuelle : ${props.anomaly}`}
          rooms={`${props.rooms} chambres`}
          hour={`Durée estimée : ${minToHours(props.duration)}`}
        />
        <br />
        {props.team.map((el, i) => (
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
