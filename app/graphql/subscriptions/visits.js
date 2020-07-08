import gql from 'graphql-tag'

export const SUBSCRIBE_VISITS = gql`
  subscription {
    visit {
      mutation
      data {
        id
        status
        hotel {
          name
        }
      }
    }
  }
`
