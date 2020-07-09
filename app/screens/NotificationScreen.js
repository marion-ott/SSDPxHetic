import React, { useContext, Fragment } from 'react'
import notificationContext from '../context/notificationContext'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Layout } from '@ui-kitten/components'
import Colors from '../constants/Colors'
import Notification from '../components/molecules/Notification'
import Header from '../components/molecules/Header'
import CustomScrollView from '../components/molecules/CustomScrollView'
import IsEmpty from '../components/molecules/IsEmpty'

export default function NotificationScreen() {
  const { notifications, updateNotifications } = useContext(notificationContext)
  return (
    <CustomScrollView Component={() => <Header text='Notification' />}>
      {notifications.length === 0 ? (
        <IsEmpty />
      ) : (
        <Fragment>
          <Text style={styles.title}>Les plus récents</Text>
          {notifications.map((notification, id) => {
            return <Notification key={id} {...notification} />
          })}
        </Fragment>
      )}
    </CustomScrollView>
  )
}

NotificationScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#241F1F',
    fontSize: 16,
    lineHeight: 19
  }
})
