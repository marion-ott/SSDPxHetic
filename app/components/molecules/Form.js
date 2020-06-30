import React from 'react'
import { Formik } from 'formik'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from '@ui-kitten/components'

export const Form = ({ callback, data, id }) => (
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
        <Input
          style={styles.input}
          size='large'
          label='E-mail'
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder='Email'
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <Input
          style={styles.input}
          size='large'
          label='Mot de passe'
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          placeholder='Mot de passe'
          textContentType='password'
          secureTextEntry={true}
        />
        <Button style={styles.button} type='submit' onPress={handleSubmit}>
          Connexion
        </Button>
      </View>
    )}
  </Formik>
)

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    marginBottom: 16,
    height: 55
  },
  button: {
    marginTop: 32,
    backgroundColor: '#3D52D5',
    height: 55,
    borderRadius: 30,
  }
})

export default Form
