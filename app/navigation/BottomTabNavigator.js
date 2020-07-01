import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet } from 'react-native'

import {
  HomeScreen,
  CalendarScreen,
  NotificationScreen,
  ProfileScreen,
  RecapScreen
} from '../screens'
import Icon from '../components/molecules/Icon'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerShown: false
  })

  return (
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
        name='Recap'
        component={RecapScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-home' />
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
            <Icon focused={focused} name='bell-outline' />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  }
})
