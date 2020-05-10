import gql from 'graphql-tag'

export const GET_COUNT = gql`
  query Count($type: String) {
    count(query: $type)
  }
`
