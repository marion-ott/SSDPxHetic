import React from 'react'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { AppRegistry } from 'react-native'
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import useCachedResources from './hooks/useCachedResources'
import * as SecureStore from 'expo-secure-store'

import Root from './index'


const devApiUrl = 'http://192.168.1.11:9000'
/* Configuration du endpoint de l'API */
const httpLink = createHttpLink({ uri: devApiUrl })
/* Configuration du header pour l'API */
const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('token')
  
  // console.log(token)

  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : ''
    }
  }
  
})

/* Initialidation du client apollo pour l'API */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  resolvers: {},
});

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ApolloProvider client={client}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Root />
        </ApplicationProvider>
      </ApolloProvider>
    )
  }
}

AppRegistry.registerComponent('SamuSocial', () => App)
