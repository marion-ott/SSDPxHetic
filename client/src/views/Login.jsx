import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputGroup } from './../molecules'
import { Button } from './../atoms'
import { Logo } from './../atoms'

const Login = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500))
          alert(JSON.stringify(values, null, 2))
        }}
        onChange={(values) => {
          console.log(props)
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Required')
        })}>
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor='email' style={{ display: 'block' }}>
                Email
              </label>
              <input
                id='email'
                placeholder='Enter your email'
                type='text'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              {errors.email && touched.email && (
                <div className='input-feedback'>{errors.email}</div>
              )}

              <button
                type='button'
                className='outline'
                onClick={handleReset}
                disabled={!dirty || isSubmitting}>
                Reset
              </button>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )
        }}
      </Formik>
      {/* <InputGroup
        className='input is-danger'
        icon='fa fa-envelope'
        labelProps={{
          text: 'Email',
          forAttr: 'email'
        }}
        inputProps={{
          type: 'email',
          name: 'email',
          placeholder: 'Email'
        }}
      />
      <InputGroup
        className='input is-danger'
        icon='fa fa-lock'
        labelProps={{
          text: 'Mot de passe',
          forAttr: 'password'
        }}
        inputProps={{
          type: 'password',
          name: 'password',
          placeholder: 'Mot de passe'
        }}
      />
      <div className='field is-grouped'>
        <div className='control'>
          <Button type='is-link '>Se connecter</Button>
        </div>
        <div className='control'>
          <Button type='is-link is-light'>Mot de passe oublié</Button>
        </div>
      </div> */}
    </div>
  )
}

export default Login
