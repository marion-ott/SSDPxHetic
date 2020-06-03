import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppRegistry } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import useCachedResources from './hooks/useCachedResources'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'

const Stack = createStackNavigator()
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:9000'
  }),
  cache: new InMemoryCache()
})

export default function App(props) {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApolloProvider client={client}>
        <ApplicationProvider {...eva} theme={eva.light} style={styles.container}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
            <NavigationContainer linking={LinkingConfiguration}>
              <Stack.Navigator>
                <Stack.Screen name='Root' component={BottomTabNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
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

AppRegistry.registerComponent('SamuSocial', () => App)
