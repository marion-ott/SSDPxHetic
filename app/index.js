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
  Text,
  ActivityIndicator
} from 'react-native'
import { formatDate } from './utils/index'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import LoginScreen from './screens/LoginScreen'
import { AppProvider } from './context/appContext'
import { DateProvider } from './context/dateContext'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Stack = createStackNavigator()

export default () => {
  const { loading: authLoading, error: authError, data: auth } = useQuery(
    CHECK_AUTH
  )

  const [getData, { loading, data, error }] = useLazyQuery(GET_USER, {
    onCompleted: ({ user }) => {
      handleLogin(user)
    },
    onError: (error) => console.warn(error)
  })

  const [date, setDate] = useState({
    today: formatDate(moment())
  })

  const [context, setContext] = useState({
    user: null
  })

  const updateContext = (obj) => {
    let state = context
    state = Object.assign({ ...state, ...obj })
    setContext(state)
  }

  useEffect(() => {
    if (auth && auth.checkAuth.success) {
      getData({
        variables: {
          id: auth.checkAuth.id
        }
      })
    }
  }, [authError, auth, authLoading])

  const handleLogin = (userData) => {
    const user = {
      id: userData.id,
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

  // if (loading || authLoading) {
  //   return <ActivityIndicator size='small' color={Colors.main} />
  // }
  // if (context.user) console.log('RENDER: ', context.user.firstName)

  return (
    <AppProvider value={{ context, updateContext }}>
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
                <Stack.Screen name='Login'>
                  {(props) => (
                    <LoginScreen handleLogin={handleLogin} {...props} />
                  )}
                </Stack.Screen>
              ) : (
                <Stack.Screen name='Root' component={BottomTabNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </DateProvider>
    </AppProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
