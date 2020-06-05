import React from 'react'
import { Formik } from 'formik'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from '@ui-kitten/components'

export const Form = props => (
  <Formik
    style={styles.container}
    initialValues={{ email: '', password: '' }}
    onSubmit={values => console.log(values)}
  >
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
        <Button
          style={styles.button}
          type='submit'
          onPress={handleSubmit}
        >
          Connexion
        </Button>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    marginBottom: 16,
    height: 55
    // borderColor: '#E0E0E0',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderRadius: 8
  },
  button: {
    marginTop: 8,
    backgroundColor: '#3D52D5',
    height: 55,
  }
})

export default Form