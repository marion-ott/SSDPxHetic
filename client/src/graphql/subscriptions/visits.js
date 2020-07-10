import gql from 'graphql-tag'

export const SUBSCRIBE_VISITS = gql`
  subscription {
    visit {
      mutation
      data {
        id
        date
        status
        team {
          users {
            firstName
            lastName
          }
        }
        hotel {
          name
        }
      }
    }
  }
`
