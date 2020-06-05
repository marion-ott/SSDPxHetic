import React from 'react'
import { useField } from 'formik'
import { TextInput, View, Text } from 'react-native';
// import { Label, Input, Select } from './../atoms'
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
  const Component = TextInput

  return (
    <View>
      <Text name={props.name} {...labelProps} />
      <Component icon={icon} {...inputProps} {...field}>
        {/* {icon && (
          <Text className={`icon ${size} is-left`}>
            <i className={`fas ${icon}`}></i>
          </Text>
        )} */}
      </Component>
      {meta.error && <Text>{meta.error}</Text>}
    </View>
  )
}

export default InputGroup
