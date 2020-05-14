import React from 'react'

const Button = ({ children, classProp, type }) => (
  <button className={`button ${classProp}`} type={type}>
    {children}
  </button>
)

export default Button
