import React, { useState, useContext, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, Modal, Text } from '@ui-kitten/components'
import moment from 'moment/min/moment-with-locales'
import appContext from '../context/appContext'
import dateContext from '../context/dateContext'
import RecapScreen from '../screens/RecapScreen'
import CardList from '../components/organisms/CardList'
import Header from '../components/molecules/Header'
import CustomScrollView from '../components/molecules/CustomScrollView'

export default function HomeScreen() {
  const { today } = useContext(dateContext)
  const [visible, setVisible] = useState(false)

  const closeModal = () => {
    setTimeout(() => {
      setVisible(false)
    }, 200)
  }

  return visible ? (
    <RecapScreen onPress={closeModal} />
  ) : (
    <CustomScrollView
      Component={() => (
        <Header text={moment().locale('fr').format('dddd Do MMMM')} />
      )}>
      <CardList
        onComplete={() => {
          console.log('complete')
          setVisible(true)
        }}
        startable={true}
        label={'Visites'}
        selected={today}
      />
    </CustomScrollView>
  )
}

HomeScreen.navigationOptions = {
  header: null
}
