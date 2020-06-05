import React from 'react'
import { Formik, Form as FormElement } from 'formik'
import InputGroup from '../atoms/InputGroup'
import { View, Button } from 'react-native';
// import { Button } from '../atoms'

const Form = ({ data, callback, schema, id, withIcon }) => (
  <Formik
    initialValues={data.initialValues}
    onSubmit={async (values, { setErrors }) => {
      schema
        .validate(values, { abortEarly: false })
        .then((_) => {
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
        })
        .catch((error) => {
          const errors = {}
          error.inner.forEach((error) => {
            errors[error.params.path] = error.errors[0]
          })
          setErrors(errors)
        })
    }}>
    {({ values, errors, isSubmitting }) => {
      return (
        <FormElement noValidate>
          {data.elements.map((el, index) => {
            return (
              <InputGroup
                key={index}
                name={el.name}
                icon={withIcon ? el.icon : ''}
                errors={errors}
                inputProps={{
                  value: values[el.name],
                  ...el.inputProps
                }}
                labelProps={el.labelProps}
              />
            )
          })}
          <View>
            <Button
              classProp={`is-link ${isSubmitting} ? 'is-loading' : ''`}
              type='submit'
              disabled={isSubmitting}
              onPress={() => console.log('Valider')}
              title="Valider"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            >
              Valider
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
              onPress={() => console.log('Annuler')}
              title="Annuler"
              color="#841584"
              accessibilityLabel="Learn more about this purple button">
              Annuler
            </Button>
          </View>
        </FormElement>
      )
    }}
  </Formik>
)

export default Form
