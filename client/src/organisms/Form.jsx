import React from 'react'
import { Formik, Form as FormElement } from 'formik'
import { InputGroup } from './../molecules'
import { Button, Label } from './../atoms'

const Form = ({ data, callback, schema, id }) => (
  <Formik
    initialValues={data.initialValues}
    onSubmit={async (values, { setErrors }) => {
      schema
        .validate(values, { abortEarly: false })
        .then((_) => {
          const body = {}
          for (const key in values) {
            if (values[key] !== data.initialValues[key]) {
              body[key] = values[key]
            }
          }

          if (!Object.keys(body).length) {
            return null
          }

          if (id) {
            body.id = id
          }
          // callback({
          //   variables: {
          //     ...body
          //   }
          // })
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
      <FormElement noValidate>
        {data.elements.map((el, index) => {
          return (
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
          )
        })}
        <div class='buttons is-full'>
          <Button
            classProp={`is-link ${isSubmitting} ? 'is-loading' : ''`}
            type='submit'
            disabled={isSubmitting}>
            Valider
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            Annuler
          </Button>
        </div>
      </FormElement>
    )}
  </Formik>
)

export default Form
