import React, { useContext } from 'react'
import sectorContext from '../context/sectorContext'

const Select = ({ name, value, options, ...field }) => {
  const { sectors } = useContext(sectorContext)

  return (
    <div className='select'>
      <select name={name} {...field} defaultValue={value}>
        <option defaultselected='true'>Sélectionnez</option>
        {name === 'sector'
          ? sectors.map((sector, i) => (
              <option key={i} value={sector.id}>
                {sector.zone}
              </option>
            ))
          : options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
      </select>
    </div>
  )
}

export default Select
