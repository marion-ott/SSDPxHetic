import React from 'react'
import { Formik } from 'formik'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from '@ui-kitten/components'
import Colors from '../../constants/Colors'

const Form = ({ callback, data, id, editMode, setEditMode }) => (
  <Formik
    style={styles.container}
    initialValues={data.initialValues}
    onSubmit={(values) => {
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
    }}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View>
        {data.elements.map((el, index) => {
          return (
            <Input
              key={index}
              style={styles.input}
              size='large'
              onChangeText={handleChange(el.name)}
              onBlur={handleBlur(el.name)}
              value={values[el.name]}
              disabled={!editMode}
              {...el.labelProps}
              {...el.inputProps}
            />
          )
        })}
        {editMode && (
          <Button style={styles.button} type='submit' onPress={handleSubmit}>
            Enregistrer les modifications
          </Button>
        )}
      </View>
    )}
  </Formik>
)

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    marginBottom: 16,
    height: 55
  },
  button: {
    marginTop: 32,
    backgroundColor: Colors.main,
    height: 55,
    borderRadius: 30
  }
})

export default Form
