import React from 'react'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './../graphql/mutations/auth'
import { getFormProps } from './../global/data'
import { Form } from './../organisms'
import { Logo, Loader } from './../atoms'

const schema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis')
})

const Login = ({ handleLogin }) => {
  const [login, { client, loading, error }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      console.log(login)
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
    return <p>there was an error</p>
  }

  if (loading) {
    return <Loader />
  }

  return (
    <section className='login'>
      <div className='box'>
        <Logo />
        <Form data={form} callback={login} schema={schema} withIcon={true} />
      </div>
    </section>
  )
}

export default Login
