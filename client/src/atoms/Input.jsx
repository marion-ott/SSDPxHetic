import React from 'react'
// import PropTypes from 'prop-types'

const Input = ({
  type,
  name,
  icon,
  placeholder,
  size,
  value,
  children,
  ...field
}) => {
  return (
    <div className={`control${icon ? ' has-icons-left' : ''}`}>
      <input
        className={`${type !== 'checkbox' ? 'input' : ''} ${size}`}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        {...field}
      />
      {children}
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  size: '',
  value: ''
}

export default Input
