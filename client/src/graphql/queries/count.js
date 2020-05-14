import gql from 'graphql-tag'

export const GET_COUNT = gql`
  query Count($query: String, $type: String!) {
    count(query: $query, type: $type)
  }
`
