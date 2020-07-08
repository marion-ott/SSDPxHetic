import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, Input, Layout } from '@ui-kitten/components'
import appContext from '../context/appContext'
import Icon from '../components/atoms/Icon'
import Colors from '../constants/Colors'
import * as SecureStore from 'expo-secure-store'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_USER } from '../graphql/mutations/users'
import { deleteTokenInStorage } from '../utils/index'
import { getFormProps } from './../global/data'
import Form from '../components/organisms/Form'

// import { UPDATE_USER } from './../graphql/mutations/users'

export default function ProfileScreen() {
  const { context, updateContext } = useContext(appContext)
  const [editMode, setEditMode] = useState(false)

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted(res) {
      const obj = {}
      for (const key in res.updateUser) {
        if (context.user[key] !== res.updateUser[key]) {
          obj[key] = res.updateUser[key]
        }
      }
      setEditMode(false)
      updateContext(obj)
    },
    onError: (error) => console.error('ERROR: ', error.message)
  })

  const [form, schema] = getFormProps({
    firstName: context.user.firstName,
    lastName: context.user.lastName,
    email: context.user.email,
    phone: context.user.phone
  })

  const onSubmit = (variables) => updateUser(variables)

  const handlePress = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      deleteTokenInStorage()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.mainTitle]} category='h2'>
        Mon profil
      </Text>
      <ScrollView>
        <Layout style={styles.layout}>
          <View style={styles.profileHeader}>
            <Text style={[styles.text, styles.title]} category='h2'>
              {context.user.firstName} {context.user.lastName}
            </Text>
            <View style={styles.teamsWrapper}>
              {context.user.mates.map((mate, index) => (
                <View style={styles.team} key={index}>
                  <Icon fill={Colors.black} name='people-outline' />
                  <Text style={styles.teamText} category='h2'>
                    {mate.firstName} {mate.lastName}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.textInfo} category='h2'>
              Informations personnelles
            </Text>
          </View>
          <View style={styles.form}>
            <Form
              id={context.user.id}
              data={form}
              callback={onSubmit}
              schema={schema}
              editMode={editMode}
              setEditMode={setEditMode}
            />
            {editMode === false && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setEditMode(true)}>
                <Text style={styles.buttonLabel}>
                  {!editMode
                    ? 'Modifier les informations'
                    : 'Enregistrer les modifications'}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.logout]}
              onPress={handlePress}>
              <Text style={[styles.buttonLabel, styles.logoutLabel]}>
                {editMode ? 'Annuler' : 'Se déconnecter'}
              </Text>
            </TouchableOpacity>
          </View>
        </Layout>
      </ScrollView>
    </View>
  )
}

ProfileScreen.navigationOptions = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 50,
    backgroundColor: Colors.white
  },
  mainTitle: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    paddingTop: 40,
    paddingBottom: 20
  },
  title: {
    marginTop: 50,
    marginBottom: 16,
    textAlign: 'center',
    color: 'black'
  },
  textInfo: {
    marginBottom: 24,
    marginTop: 16,
    fontSize: 20,
    lineHeight: 24
  },
  teamsWrapper: {
    backgroundColor: Colors.offWhite,
    padding: 16,
    marginBottom: 24,
    borderRadius: 4
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  teamText: {
    marginLeft: 18,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
  form: {
    justifyContent: 'center',
    width: '100%'
  },
  inputs: {},
  labelInput: {
    paddingBottom: 7
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
    borderRadius: 30,
    width: '100%',
    height: 56,
    width: '100%',
    marginTop: 20
  },
  buttonLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19
  },
  logout: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.brightOrange
  },
  logoutLabel: {
    color: Colors.brightOrange
  }
})
