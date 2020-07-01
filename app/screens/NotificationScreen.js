import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { useContext } from 'react'
import userContext from '../context/userContext'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout } from '@ui-kitten/components'
import { MonoText } from '../components/StyledText';
import Notif from '../components/molecules/Notif'

export default function NotificationScreen() {
  const { user } = useContext(userContext)

  const notifs = [
    {
      ico: 'flip-2-outline',
      color: '#C4DD2A',
      type: 'Replanification',
      fresh: true,
      data: {
        hotel: 'Akbou',
        initialDate: '14/07',
        newDate: '25/07',
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
        newDate: '20/07',
      }
    }
  ]

  return (
    <View style={styles.container}>
      <Text style={[styles.currentDay, styles.text]} category='h5'>
        Mercredi 1er Juillet
      </Text>
      <Layout style={styles.layout} level='1'>

        <View style={styles.layoutContain}>
          <ScrollView style={styles.cards}>
            {Object.keys(notifs).map((notif) => {
              var notifCard = notifs[notif]
              return (
                <Notif
                  key={ notif }
                  data={ notifCard }
                  { ...notifCard }
                />
              )
            })}
          </ScrollView>
        </View>
      </Layout>
    </View>
  )
}

NotificationScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D52D5'
  },
  currentDay: {
    color: '#FFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 20
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  layoutContain: {
    flex: 1,
    paddingTop: 30,
  },
})