import React, { useContext } from 'react'
import notificationContext from '../context/notificationContext'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Layout } from '@ui-kitten/components'
import Colors from '../constants/Colors'
import Notification from '../components/molecules/Notification'
import Header from '../components/molecules/Header'
import CustomScrollView from '../components/molecules/CustomScrollView'

export default function NotificationScreen() {
  const { notifications, updateNotifications } = useContext(notificationContext)
  const notifs = [
    {
      ico: 'flip-2-outline',
      color: '#C4DD2A',
      type: 'Replanification',
      fresh: true,
      data: {
        hotel: 'Akbou',
        initialDate: '14/07',
        newDate: '25/07'
      }
    },
    {
      ico: 'flip-2-outline',
      color: '#C4DD2A',
      type: 'Replanification',
      fresh: true,
      data: {
        hotel: 'Novotel Atlantide',
        initialDate: '10/07',
        newDate: '20/07'
      }
    },
    {
      ico: 'flip-2-outline',
      color: '#C4DD2A',
      type: 'Replanification',
      fresh: true,
      data: {
        hotel: 'Akbou',
        initialDate: '14/07',
        newDate: '25/07'
      }
    },
    {
      ico: 'flip-2-outline',
      color: '#C4DD2A',
      type: 'Replanification',
      fresh: true,
      data: {
        hotel: 'Novotel Atlantide',
        initialDate: '10/07',
        newDate: '20/07'
      }
    },
    {
      ico: 'flip-2-outline',
      color: '#C4DD2A',
      type: 'Replanification',
      fresh: true,
      data: {
        hotel: 'Akbou',
        initialDate: '14/07',
        newDate: '25/07'
      }
    },
    {
      ico: 'flip-2-outline',
      color: '#C4DD2A',
      type: 'Replanification',
      fresh: true,
      data: {
        hotel: 'Novotel Atlantide',
        initialDate: '10/07',
        newDate: '20/07'
      }
    }
  ]

  return (
    <CustomScrollView Component={() => <Header text='Notification' />}>
      <Text style={styles.title}>Les plus récents</Text>
      {notifications.length > 0 && (
        <ScrollView style={styles.cards}>
          {notifications.map((notification, id) => {
            return <Notification key={id} {...notification} />
          })}
        </ScrollView>
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
