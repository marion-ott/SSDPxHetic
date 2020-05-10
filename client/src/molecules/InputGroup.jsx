import React, { useMemo } from 'react'
import { useField } from 'formik'
import { Input } from './../atoms'
import { Label } from './../atoms'

const InputGroup = ({
  labelProps,
  inputProps,
  size,
  icon,
  errors,
  ...props
}) => {
  const [field, meta] = useField(props)
  return (
    <div className='field'>
      <Label name={props.name} {...labelProps} />
      <div className='control has-icons-left has-icons-right'>
        <Input {...inputProps} {...field} />
        {icon && (
          <span className={`icon ${size} is-left`}>
            <i className={`fas ${icon}`}></i>
          </span>
        )}
        {meta.error && <p>{meta.error}</p>}
        {/* <span className={`icon ${size} is-right`}>
          <i className='fas fa-exclamation-triangle'></i>
        </span> */}
      </div>
      {/* <p className='help is-danger'>This email is invalid</p> */}
    </div>
  )
}

export default InputGroup
