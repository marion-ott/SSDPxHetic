import React from 'react'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { AppRegistry } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import useCachedResources from './hooks/useCachedResources'

import Root from './index'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.1.34'
  }),
  cache: new InMemoryCache()
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
