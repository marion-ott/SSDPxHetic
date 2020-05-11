import React from 'react'

const Button = ({ children, classname, type }) => (
  <button className={`button ${classname}`} type={type}>
    {children}
  </button>
)

export default Button
