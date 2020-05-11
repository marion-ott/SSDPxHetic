import React from 'react'
// import PropTypes from 'prop-types'

const Input = ({ type, name, placeholder, size, value, ...field }) => {
  return (
    <input
      className={`input ${size}`}
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      {...field}
    />
  )
}

Input.defaultProps = {
  type: 'text',
  size: '',
  value: ''
}

export default Input
