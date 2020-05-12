import React from 'react'
// import { Formik } from 'formik'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './../graphql/mutations/auth'
import { form } from './../global/data'
import { Form } from './../organisms'
import { Logo } from './../atoms'

const schema = yup.object({
  email: yup.string().email('Email invalide').required('email requis'),
  password: yup.string().required('mot de passe requis')
})

const Login = () => {
  // const [login, { data }] = useMutation(LOGIN, {
  //   onCompleted: (user, token) => {
  //     console.log(user, token)
  //   },
  //   onError: (error) => console.log(error.message)
  // })
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(res) {
      console.log(res)
    },
    onError: (error) => console.log(error)
  })

  if (error) {
    return <p>there was an error</p>
  }

  const data = form.login
  return (
    <section className='login'>
      <div className='box'>
        <Logo />
        <Form data={data} callback={login} schema={schema} />
      </div>
    </section>
  )
}

export default Login
