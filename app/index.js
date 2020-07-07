import React, { useEffect, useState } from 'react'
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import moment from 'moment'

import useCheckAuth from './hooks/useCheckAuth'
import { DateProvider } from './context/dateContext'
import { UserProvider } from './context/userContext'
import { RecapProvider } from './context/recapContext'
import { formatDate } from './utils/index'

import { LoginScreen } from './screens'

const Stack = createStackNavigator()

export default () => {
  const { loading, error, data } = useCheckAuth()
  const [date, setDate] = useState({
    today: formatDate(moment())
  })
  /**
   * * temporary loggedin data
   */
  // const [auth, setAuth] = useState({
  //   user: {
  //     email: 'undefined',
  //     firstName: 'Youssouf',
  //     lastName: 'Salarié 9',
  //     mates: [
  //       {
  //         firstName: 'Flora',
  //         lastName: 'nom'
  //       },
  //       {
  //         firstName: 'Ramdane',
  //         lastName: 'nom'
  //       }
  //     ],
  //     phone: '060000000'
  //   },
  //   schedule: { startTime: '08h30', endTime: '16h30', __typename: 'Shift' },
  //   teamId: '5f03013924aa9a0007167c21',
  //   loggedIn: true
  // })

  /**
   * TODO: check localStorage for already loggedIn user
   */
  const [auth, setAuth] = useState({ user: null, loggedIn: false })

  useEffect(() => {
    if (data) {
      setAuth({
        user: data.checkAuth.user,
        loggedIn: data.checkAuth.success
      })
    }
  }, [error, data])

  const handleLogin = (userData) => {
    const user = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone
    }

    let schedule, teamId
    userData.teams.forEach(({ id, startDate, endDate, users }) => {
      if (moment().isBetween(startDate, endDate)) {
        teamId = id
        user.mates = users.filter((user) => user.id !== userData.id)
      }
    })

    userData.sector.schedules.forEach(({ startDate, endDate, shift }) => {
      if (moment().isBetween(startDate, endDate)) {
        schedule = shift
      }
    })

    setAuth({
      user,
      teamId,
      schedule,
      loggedIn: true
    })

  }
  console.log(auth)

  return (
    <UserProvider value={auth}>
      <DateProvider value={date}>
        <RecapProvider value={{}}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            <StatusBar barStyle='light-content' />
            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}>
                {!auth.loggedIn ? (
                  <Stack.Screen
                    name='Login'
                    component={() => <LoginScreen handleLogin={handleLogin} />}
                  />
                ) : (
                  <Stack.Screen name='Root' component={BottomTabNavigator} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </RecapProvider>
      </DateProvider>
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
