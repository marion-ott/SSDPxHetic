import React from 'react'

const Label = ({ size, text, name }) => (
  <label className={`label ${size}`} htmlFor={name}>
    {text}
  </label>
)

Label.defaultProps = {
  size: ''
}

export default Label
