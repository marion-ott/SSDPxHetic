import gql from 'graphql-tag'

export const GET_SECTORS = gql`
  query {
    sectors {
      id
      zone
    }
  }
`
