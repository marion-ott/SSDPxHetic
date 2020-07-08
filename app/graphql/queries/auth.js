import gql from 'graphql-tag'

export const CHECK_AUTH = gql`
  query {
    checkAuth {
      success
      user {
        id
      }
    }
  }
`
