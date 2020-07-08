import React, { useState, useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import { useSubscription } from '@apollo/react-hooks'
import { SUBSCRIBE_VISITS } from '../graphql/subscriptions/visits'
import { NotificationProvider } from '../context/notificationContext'
import HomeScreen from '../screens/HomeScreen'
import CalendarScreen from '../screens/CalendarScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'
import NotificationIcon from '../components/molecules/NotificationIcon'
import Icon from '../components/atoms/Icon'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator({ navigation, route }) {
  const [notifications, setNotifications] = useState([])
  const { data, loading } = useSubscription(SUBSCRIBE_VISITS)

  useEffect(() => {
    if (data) {
      const state = notifications
      state.push(data)
      updateNotifications(state)
    }
  }, [data])

  const updateNotifications = (state) => {
    setNotifications(state)
  }

  navigation.setOptions({
    headerShown: false
  })

  return (
    <NotificationProvider value={{ notifications, updateNotifications }}>
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
          showLabel: false,
          style: styles.container
        }}
        screenOptions={{
          headerShown: false
        }}>
        <BottomTab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Home',
            showLabel: false,
            tabBarIcon: ({ focused }) => (
              <Icon focused={focused} name='home-outline' />
            )
          }}
        />
        <BottomTab.Screen
          name='Calendar'
          component={CalendarScreen}
          options={{
            title: 'Calendar',
            tabBarIcon: ({ focused }) => (
              <Icon focused={focused} name='calendar-outline' />
            )
          }}
        />
        <BottomTab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Icon focused={focused} name='person-outline' />
            )
          }}
        />
        <BottomTab.Screen
          name='Notification'
          component={NotificationScreen}
          options={{
            title: 'Notification',
            tabBarIcon: ({ focused }) => (
              <NotificationIcon
                notifications={notifications}
                focused={focused}
                name='bell-outline'
              />
            )
          }}
        />
      </BottomTab.Navigator>
    </NotificationProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  }
})
