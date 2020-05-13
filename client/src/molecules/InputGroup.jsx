import React from 'react'
import { useField } from 'formik'
import { Label, Input, Select } from './../atoms'
// import { Label } from './../atoms'

const InputGroup = ({
  labelProps,
  inputProps,
  size,
  icon,
  errors,
  ...props
}) => {
  const [field, meta] = useField(props)
  const Component = inputProps.type === 'select' ? Select : Input
  return (
    <div className='field'>
      <Label name={props.name} {...labelProps} />
      <Component icon={icon} {...inputProps} {...field}>
        {icon && (
          <span className={`icon ${size} is-left`}>
            <i className={`fas ${icon}`}></i>
          </span>
        )}
      </Component>
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}

export default InputGroup
