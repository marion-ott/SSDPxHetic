import React from 'react'

const Label = ({ size, text, name, classProp }) => (
  <label className={`label ${size} ${classProp}`} htmlFor={name}>
    {text}
  </label>
)

Label.defaultProps = {
  size: ''
}

export default Label
