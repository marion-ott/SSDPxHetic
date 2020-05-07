import React from 'react'

const Label = ({ size, text, forAttr }) => (
  <label className={`label ${size}`} htmlFor={forAttr}>
    {text}
  </label>
)

Label.defaultProps = {
  size: ''
}

export default Label
