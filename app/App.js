import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppRegistry } from 'react-native'
// APOLLO
import { ApolloClient } from 'apollo-client'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
// HOOKS
import useCheckAuth from './hooks/useCheckAuth'
import useCachedResources from './hooks/useCachedResources'
// NAV
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
// SCREENS
import LoginScreen from './screens/LoginScreen'
// CONTEXT
import { UserProvider } from './context/userContext'

const Stack = createStackNavigator()

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.1.57:9000'
  }),
  cache: new InMemoryCache()
})

const App = () => {
  const { loading, error, data } = useCheckAuth()
  const [auth, setAuth] = useState({ user: null, loggedIn: false })

  useEffect(() => {
    if (data) {
      setAuth({
        user: data.user,
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

  return (
    <UserProvider value={auth}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            {/* {!auth.loggedIn ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{
                  title: 'Connectez vous',
                  animationTypeForReplace: auth.loggedIn ? 'pop' : 'push'
                }}
              />
            ) : (
              // User is signed in
              <Stack.Screen name='Home' component={HomeScreen} />
            )} */}
            <Stack.Screen name='Root' component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </UserProvider>
  )
}

export default function Root(props) {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApolloProvider client={client}>
        <ApplicationProvider
          {...eva}
          theme={eva.light}
          style={styles.container}>
          <App />
        </ApplicationProvider>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

AppRegistry.registerComponent('SamuSocial', () => Root)
