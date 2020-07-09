import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { split, concat } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import App from './views/_App'
import './index.css'

const devApiUrl = 'http://3.8.20.81:9000/'
/* Configuration du endpoint de l'API */
const httpLink = createHttpLink({ uri: devApiUrl })
/* Configuration du header pour l'API */
const authMiddleware = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token')

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
