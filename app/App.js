import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  AppRegistry
} from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import useCheckAuth from './hooks/useCheckAuth'
import useCachedResources from './hooks/useCachedResources'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import LoginScreen from './screens/LoginScreen'
import { UserProvider } from './context/userContext'

const Stack = createStackNavigator()

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.1.37:9000'
  }),
  cache: new InMemoryCache()
})

const App = () => {
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

  const Login = () => <LoginScreen handleLogin={handleLogin} />

  if (loading) {
    return <Text>Loading</Text>
  }

  // if (error) {
  //   return <Text>error</Text>
  // }
  console.log(auth)

  return (
    <UserProvider value={auth}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            {!auth.loggedIn ? (
              <Stack.Screen
                name='Login'
                component={Login}
                options={{
                  title: 'Connectez vous',
                  animationTypeForReplace: auth.loggedIn ? 'pop' : 'push'
                }}></Stack.Screen>
            ) : (
              <Stack.Screen name='Root' component={BottomTabNavigator} />
            )}
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
