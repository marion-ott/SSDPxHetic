import React from 'react'

const Select = ({ name, value, options, ...field }) => (
  <div className='select'>
    <select name={name} {...field} defaultValue={value}>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

export default Select
