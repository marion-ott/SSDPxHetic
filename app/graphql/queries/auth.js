import gql from 'graphql-tag'

export const CHECK_AUTH = gql`
  query {
    checkAuth {
      id
      firstName
      lastName
      email
      role
      address
      sector {
        zone
      }
    }
  }
`
