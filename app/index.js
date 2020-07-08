import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import moment from 'moment'
import { GET_USER } from './graphql/queries/users'
import { CHECK_AUTH } from './graphql/queries/auth'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import useCheckAuth from './hooks/useCheckAuth'
import { formatDate } from './utils/index'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import { LoginScreen } from './screens'
import { AppProvider } from './context/appContext'
import { UserProvider } from './context/userContext'
import { DateProvider } from './context/dateContext'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Stack = createStackNavigator()

export default () => {
  const { loading: authLoading, error: authError, data: auth } = useCheckAuth()

  const [getData, { loading, data, error }] = useLazyQuery(GET_USER, {
    onCompleted: ({ user }) => {
      handleLogin(user)
    },
    onError: (error) => console.warn(error)
  })

  const [date, setDate] = useState({
    today: formatDate(moment())
  })

  const [context, setContext] = useState({})

  const updateContext = (obj) => {
    setContext({
      ...context,
      ...obj
    })
  }

  useEffect(() => {
    if (auth && auth.checkAuth.success) {
      auth.checkAuth.user.id = '5f043bdf24aa9a00074c5c4d'
      getData({
        variables: {
          id: auth.checkAuth.user.id
        }
      })
    }
  }, [authError, auth, authLoading])

  useEffect(() => {}, [loading, data, error])

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

    updateContext({
      user,
      teamId,
      schedule
    })
  }

  // console.log(loading, authLoading, auth, data)

  if (loading || authLoading) {
    return <ActivityIndicator size='small' color={Colors.main} />
  }

  return (
    <AppProvider value={{ context, updateContext }}>
      <UserProvider value={context}>
        <DateProvider value={date}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            <StatusBar barStyle='light-content' />
            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}>
                {!context.user ? (
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
        </DateProvider>
      </UserProvider>
    </AppProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
