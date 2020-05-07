import React from 'react'

import { Input } from './../atoms'
import { Label } from './../atoms'

const InputGroup = ({ labelProps, inputProps, size, icon }) => (
  <div className='field'>
    <Label {...labelProps} />
    <div className='control has-icons-left has-icons-right'>
      <Input {...inputProps} />
      {icon && (
        <span className={`icon ${size} is-left`}>
          <i className={`fas ${icon}`}></i>
        </span>
      )}

      {/* <span className={`icon ${size} is-right`}>
        <i className='fas fa-exclamation-triangle'></i>
      </span> */}
    </div>
    {/* <p className='help is-danger'>This email is invalid</p> */}
  </div>
)

export default InputGroup
