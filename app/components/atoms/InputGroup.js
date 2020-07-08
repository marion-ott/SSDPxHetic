import React from 'react'
import { useField } from 'formik'
import { View, StyleSheet, Text } from 'react-native'
import { Input } from '@ui-kitten/components'
import Colors from '../../constants/Colors'

const InputGroup = ({
  labelProps,
  inputProps,
  name,
  errors,
  onChangeText,
  onBlur,
  handleChange,
  handleBlur,
  ...props
}) => {
  const [field, meta] = useField(props)

  return <View></View>
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    height: 55
  }
})

export default InputGroup
