import React from 'react'

const Button = ({ children, classProp, type, onClick }) => (
  <button onClick={onClick} className={`button ${classProp}`} type={type}>
    {children}
  </button>
)

export default Button
