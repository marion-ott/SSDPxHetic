import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Input, Layout } from '@ui-kitten/components'
import userContext from '../context/userContext'
import Icon from '../components/molecules/CommonIcon'

import { useMutation } from '@apollo/react-hooks'
// import { UPDATE_USER } from './../graphql/mutations/users'

export default function ProfileScreen() {
  const { user } = useContext(userContext)
  const [value, setValue] = React.useState(user)
  const [editMode, setEditMode] = React.useState(false);

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
              <View style={styles.binome}>
                <Icon fill="#000000" name="people-outline"  />
              <Text style={styles.binomeTxt} category='h2'>
                  {value.firstName} {value.lastName}
                </Text>
              </View>
              <Text style={styles.textInfo} category='h2'>
                Informations personnelles
              </Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputs}>
                <Text style={[styles.text, styles.labelInput]} category='s1'>
                  Prénom
                </Text>
                <Input
                  disabled={ !editMode }
                  placeholder={value.firstName}
                  value={value.firstName}
                  onChangeText={(evt) => onChangeProfile(evt, 'firstname')}
                />
              </View>
              <View style={styles.inputs}>
                <Text style={[styles.text, styles.labelInput]} category='s1'>
                  Nom
                </Text>
                <Input
                  disabled={ !editMode }
                  placeholder={value.lastName}
                  value={value.lastName}
                  onChangeText={(evt) => onChangeProfile(evt, 'lastname')}
                />
              </View>
              <View style={styles.inputs}>
                <Text style={[styles.text, styles.labelInput]} category='s1'>
                  Email
                </Text>
                <Input
                  disabled={ !editMode }
                  placeholder={value.email}
                  value={value.email}
                  onChangeText={(evt) => onChangeProfile(evt, 'mail')}
                />
              </View>
              <View style={styles.inputs}>
                <Text style={[styles.text, styles.labelInput]} category='s1'>
                  Téléphone
                </Text>
                <Input
                  disabled={ !editMode }
                  placeholder='0634239100'
                  value={value.phone || '06000000'}
                  onChangeText={(evt) => onChangeProfile(evt, 'phone')}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={ !editMode ? toggleEdit : saveChanges}
                >
                  <Text style={styles.buttonLabel}>
                    { !editMode ? 'Modifier les informations' : 'Enregistrer les modifications'}
                  </Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#3D52D5'
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#FFFFFF',
  },
  mainTitle: {
    color: '#FFFF',
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
    lineHeight: 24,
  },
  binome: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: 'black',
    borderRadius: 4,
    textDecorationLine: 'underline',
  },
  binomeTxt: {
    marginLeft: 66,
    textAlign: 'center',
  },
  form: {
    justifyContent: 'center',
    width: '100%',
  },
  inputs: {
  },
  labelInput: {
    paddingBottom: 7
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D52D5',
    borderRadius: 30,
    width: '100%',
    height: 56,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
  },
})
