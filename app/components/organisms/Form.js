import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button } from '@ui-kitten/components'
import Icon from '../atoms/Icon'
import Colors from '../../constants/Colors'

const Form = ({ callback, data, id, editable = true, btnLabel }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const renderIcon = (props) => (
    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableOpacity>
  )

  return (
    <Formik
      style={styles.container}
      initialValues={data.initialValues}
      onSubmit={(values) => {
        const variables = {
          data: {}
        }

        for (const key in values) {
          if (values[key] !== data.initialValues[key]) {
            variables.data[key] = values[key]
          }
        }

        if (!Object.keys(variables.data).length) {
          return null
        }

        if (id) {
          variables.id = id
        }

        callback({
          variables
        })
      }}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          {data.elements.map(({ name, labelProps, inputProps }, index) => (
            <Input
              key={index}
              style={styles.input}
              size='large'
              accessoryRight={name === 'password' && renderIcon}
              onChangeText={handleChange(name)}
              onBlur={handleBlur(name)}
              value={values[name]}
              disabled={!editable}
              secureTextEntry={name === 'password' ? secureTextEntry : false}
              {...labelProps}
              {...inputProps}
            />
          ))}
          {editable && (
            <Button style={styles.button} type='submit' onPress={handleSubmit}>
              {btnLabel}
            </Button>
          )}
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    marginBottom: 26,
    height: 55
  },
  button: {
    marginTop: 5,
    backgroundColor: Colors.main,
    height: 55,
    borderRadius: 30
  }
})

export default Form
