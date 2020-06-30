import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native'
import useCheckAuth from './hooks/useCheckAuth'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import { LoginScreen } from './screens'
import { UserProvider } from './context/userContext'

const Stack = createStackNavigator()

export default () => {
  const { loading, error, data } = useCheckAuth()
  const [auth, setAuth] = useState({
    user: {
      email: 'admin@samu-social.net',
      firstName: 'Admin',
      id: '5ee62d1cc414790007fb604c',
      lastName: 'Admin',
      role: 'ADMIN'
    },
    loggedIn: true
  })
  // const [auth, setAuth] = useState({ user: null, loggedIn: false })

  useEffect(() => {
    if (data) {
      setAuth({
        user: data.checkAuth,
        loggedIn: true
      })
    }
  }, [error, data])

  const handleLogin = (userData) => {
    setAuth({
      user: userData,
      loggedIn: true
    })
  }

  if (loading) {
    return <Text>Loading</Text>
  }

  return (
    <UserProvider value={auth}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
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
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
