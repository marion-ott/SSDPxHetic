import React, { useState, useContext, useEffect, useReducer } from 'react'
import moment from 'moment'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { Text, Layout } from '@ui-kitten/components'
import appContext from '../context/appContext'
import dateContext from '../context/dateContext'
import { RecapScreen } from './'
import { CardList } from '../components/organisms'
import { Details } from '../components/molecules'
import Colors from '../constants/Colors'

export default function HomeScreen() {
  const { today } = useContext(dateContext)
  const [visitsCompleted, setVisitsCompleted] = useState(false)

  //TODO: trigger recap display
  const onVisitsCompleted = () => {
    setVisitsCompleted(true)
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.currentDay, styles.text]} category='h5'>
        {moment(today).locale('fr').format('dddd Do MMMM')}
      </Text>
      <Layout style={styles.layout} level='1'>
        <View style={styles.wrapper}>
          <CardList
            onComplete={onVisitsCompleted}
            startable={true}
            label={'Visites'}
          />
        </View>
      </Layout>
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main
  },
  currentDay: {
    color: Colors.white,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  wrapper: {
    flex: 1
  }
})
