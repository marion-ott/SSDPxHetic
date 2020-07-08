import React, { useContext } from 'react'
import notificationContext from '../context/notificationContext'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Layout } from '@ui-kitten/components'
import Colors from '../constants/Colors'
import Notification from '../components/molecules/Notification'

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
    <View style={styles.container}>
      <Text style={[styles.currentDay, styles.text]} category='h5'>
        Notif
      </Text>

      <Layout style={styles.layout} level='1'>
        <Text style={styles.title}>Les plus récents</Text>

        <View style={styles.layoutContain}>
          {notifications.length > 0 && (
            <ScrollView style={styles.cards}>
              {notifications.map((notification, id) => {
                return <Notification key={id} {...notification} />
              })}
            </ScrollView>
          )}
        </View>
      </Layout>
    </View>
  )
}

NotificationScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main
  },
  currentDay: {
    color: '#FFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    paddingTop: 40,
    paddingBottom: 20
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 50
  },
  layoutContain: {
    flex: 1
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#241F1F',
    fontSize: 16,
    lineHeight: 19
  }
})
