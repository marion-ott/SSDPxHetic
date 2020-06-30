// import React from 'react'
// import { ApolloProvider } from '@apollo/react-hooks'
// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'
// import useCachedResources from './hooks/useCachedResources'

// import * as eva from '@eva-design/eva'
// import { ApplicationProvider } from '@ui-kitten/components'
// import { StyleSheet, AppRegistry } from 'react-native'

// import App from './App'

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: 'http://192.168.1.37:9000'
//   }),
//   cache: new InMemoryCache()
// })

// export default function Root() {
//   const isLoadingComplete = useCachedResources()

//   if (!isLoadingComplete) {
//     return null
//   } else {
//     return (
//       <ApolloProvider client={client}>
//         <ApplicationProvider
//           {...eva}
//           theme={eva.light}
//           style={styles.container}>
//           <App />
//         </ApplicationProvider>
//       </ApolloProvider>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   }
// })

// AppRegistry.registerComponent('SamuSocial', () => console.log('ooooo'))
