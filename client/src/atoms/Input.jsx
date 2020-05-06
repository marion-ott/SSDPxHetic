import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ type, placeholder, size, value }) => (
  <input
    className={`input ${size}`}
    type={type}
    placeholder={placeholder}
    defaultValue={value}
  />
)

Input.defaultProps = {
  type: 'text',
  size: '',
  value: ''
}

export default Input
