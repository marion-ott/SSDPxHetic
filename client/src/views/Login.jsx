import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './../graphql/mutations/auth'
import { form } from './../global/data'
import { InputGroup } from './../molecules'
import { Button } from './../atoms'
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
    }
  })
  const data = form.login
  return (
    <section className='login'>
      <div className='box'>
        <Logo />
        <Formik
          initialValues={data.initialValues}
          onSubmit={async (values, { setErrors }) => {
            schema
              .validate(values, { abortEarly: false })
              .then((_) => {
                login({
                  variables: {
                    ...values
                  }
                })
              })
              .catch((error) => {
                const errors = {}
                error.inner.forEach((error) => {
                  errors[error.params.path] = error.errors[0]
                })
                setErrors(errors)
              })
          }}>
          {({ values, errors, isSubmitting }) => (
            <Form noValidate>
              {data.elements.map((el, index) => (
                <InputGroup
                  key={index}
                  name={el.name}
                  icon={el.icon}
                  errors={errors}
                  inputProps={{
                    value: values[el.name],
                    ...el.inputProps
                  }}
                  labelProps={el.labelProps}
                />
              ))}
              <Button type='submit' disabled={isSubmitting}>
                Se connecter
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default Login
