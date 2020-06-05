import React from 'react'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from '../../graphql/mutations/auth'
import { getFormProps } from '../../global/data'
import Form from '../molecules/Form'
import { View } from 'react-native';

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
    <View>
      <View>
        {/* <Logo /> */}
        <Form data={form} callback={login} schema={schema} withIcon={true} />
      </View>
    </View>
  )
}

export default Login
