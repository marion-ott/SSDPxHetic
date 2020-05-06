import React from 'react'

const Button = ({ children, type }) => (
  <button className={`button ${type}`}>{children}</button>
)

export default Button
