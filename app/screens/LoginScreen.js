import * as React from 'react'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './../graphql/mutations/auth'
import { getFormProps } from './../global/data'
import { setTokenInStorage } from '../utils/index'

import {
  Platform,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Image,
  KeyboardAvoidingView
} from 'react-native'
import Form from '../components/organisms/Form'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import logo from '../assets/images/logo.png'

const schema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis')
})

export default function LoginScreen({ handleLogin }) {
  const [login, { client, loading, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      handleLogin(login.user)
      setTokenInStorage(login.token)
    },
    onError: (error) => console.log('ERROR MESSAGE : ', error)
  })

  const [form] = getFormProps({
    email: '',
    password: ''
  })

  if (error) {
    return <Text>there was an error: {JSON.stringify(error.message)}</Text>
  }

  if (loading) {
    return <ActivityIndicator size='small' color={Colors.main} />
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.form}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
          <Text style={styles.text} source={logo}>
            Accès agent de terrain
          </Text>
          <Form
            data={form}
            callback={login}
            schema={schema}
            btnLabel='Se connecter'
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

LoginScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15
  },
  form: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  text: {
    alignSelf: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 16
  }
})
