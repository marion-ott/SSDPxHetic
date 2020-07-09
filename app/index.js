import React, { useEffect, useState, useContext } from 'react'
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
import { useSubscription } from '@apollo/react-hooks'
import { SUBSCRIBE_VISITS } from './graphql/subscriptions/visits'
import { NotificationProvider } from './context/notificationContext'
import { formatDate } from './utils/index'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import LoginScreen from './screens/LoginScreen'
import { AppProvider } from './context/appContext'
import { DateProvider } from './context/dateContext'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Stack = createStackNavigator()

export default () => {
  const [notifications, setNotifications] = useState([])
  const { data: res } = useSubscription(SUBSCRIBE_VISITS)

  const { loading: authLoading, error: authError, data: auth } = useQuery(
    CHECK_AUTH
  )

  const [getData] = useLazyQuery(GET_USER, {
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

  const [lougout, setLogout] = useState(false)

  const updateContext = (obj) => {
    console.log('update context')
    let state = context
    if (Object.keys(obj).length == 0) {
      setLogout(false)
    } else {
      console.log('update: ', obj)
      state = Object.assign({ ...state, ...obj })
      setContext({ ...state })
      setLogout(true)
    }
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

  useEffect(() => {
    if (res) {
      const state = notifications
      state.push(res)
      setNotifications([...state])
    }
  }, [res])

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
  if (context.user) {
    console.log('render: ', context.user.firstName)
  }
  // console.log("context", context)

  // if (loading || authLoading) {
  //   return <ActivityIndicator size='small' color={Colors.main} />
  // }
  // if (context.user) console.log('RENDER: ', context.user.firstName)

  return (
    <AppProvider value={{ context, updateContext }}>
      <NotificationProvider value={{ notifications, setNotifications }}>
        <DateProvider value={date}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            <StatusBar barStyle='light-content' />
            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}>
                {!lougout ? (
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
      </NotificationProvider>
    </AppProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
