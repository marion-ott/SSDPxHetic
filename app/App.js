import React from 'react'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { AppRegistry } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import useCachedResources from './hooks/useCachedResources'
import * as SecureStore from 'expo-secure-store'
import { split, concat } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import Root from './index'

const devApiUrl = 'http://3.8.20.81:9000/'
/* Configuration du endpoint de l'API */
const httpLink = createHttpLink({ uri: devApiUrl })
/* Configuration du header pour l'API */
const authMiddleware = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('token')

  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : ''
    }
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://3.8.20.81:9000/`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

/* Initialidation du client apollo pour l'API */
const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
  resolvers: {}
})

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
