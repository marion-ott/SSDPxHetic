import React from 'react'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../../graphql/mutations/auth'
import { getFormProps } from '../../global/data'
import Form from '../molecules/Form'
import { Text, View, Image, StyleSheet } from 'react-native'

import logo from '../../assets/images/logo.png'

const schema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis')
})

const Login = ({ handleLogin }) => {
  const [login, { client, loading, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      //TODO: update context with logged login.user
      handleLogin(login.user)
      localStorage.setItem('token', login.token)
      client.resetStore()
    },
    onError: (error) => console.log('ERROR MESSAGE : ', error)
  })

  const [form] = getFormProps({
    email: '',
    password: ''
  })

  if (error) {
    return <Text>there was an error</Text>
  }

  if (loading) {
    return <Text>loading</Text>
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={logo}
      />
      <Text
        style={styles.text}
        source={logo}
      >
        Accès agent de terrain
      </Text>
      <Form
        data={form}
        callback={login}
        schema={schema}
        withIcon={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    // marginTop: 216,
    alignSelf: 'center'
  },
  text: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 48,
    fontWeight: "bold",
    fontSize: 16
  }
})

export default Login
