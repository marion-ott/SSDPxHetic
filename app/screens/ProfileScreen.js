import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, Input, Layout } from '@ui-kitten/components'
import userContext from '../context/userContext'
import Icon from '../components/atoms/Icon'
import Colors from '../constants/Colors'
import { useMutation } from '@apollo/react-hooks'
// import { UPDATE_USER } from './../graphql/mutations/users'

export default function ProfileScreen() {
  const { user } = useContext(userContext)
  const [value, setValue] = useState(user)
  const [editMode, setEditMode] = useState(false)

  // const [callback, { loading, error }] = useMutation( mutation, {
  //   onCompleted() {
  //     onChangeProfile()
  //   },
  //   onError: (error) => console.error(error)
  // })

  function onChangeProfile(val, name) {
    setValue({
      ...value,
      [name]: val
    })
  }

  const toggleEdit = () => {
    setEditMode(true)
  }

  const saveChanges = () => {
    setEditMode(false)
  }
  console.log(user)

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.mainTitle]} category='h2'>
        Mon profil
      </Text>
      <ScrollView>
        <Layout style={styles.layout}>
          <View style={styles.profileHeader}>
            <Text style={[styles.text, styles.title]} category='h2'>
              {value.firstName} {value.lastName}
            </Text>
            <View style={styles.teamsWrapper}>
              {user.mates.map((mate, index) => (
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
            {Object.keys(user).map((key, index) => {
              if (key !== 'mates') {
                return (
                  <View key={index} style={styles.inputs}>
                    <Text
                      style={[styles.text, styles.labelInput]}
                      category='s1'>
                      {key}
                    </Text>
                    <Input
                      disabled={!editMode}
                      placeholder={user[key]}
                      value={user[key]}
                      onChangeText={(evt) => onChangeProfile(evt, key)}
                    />
                  </View>
                )
              }
            })}
            <TouchableOpacity
              style={styles.button}
              onPress={!editMode ? toggleEdit : saveChanges}>
              <Text style={styles.buttonLabel}>
                {!editMode
                  ? 'Modifier les informations'
                  : 'Enregistrer les modifications'}
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
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
    fontWeight: 600,
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
    marginTop: 20,
    marginBottom: 20
  },
  buttonLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19
  }
})
