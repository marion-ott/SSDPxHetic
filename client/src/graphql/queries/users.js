import gql from 'graphql-tag'

export const GET_USER = gql`
  query User($id: ID!) {
    user(where: { id: $id }) {
      id
      firstName
      lastName
      sector {
        id
        zone
      }
      address
      email
    }
  }
`

export const GET_USERS = gql`
  query Users($type: String!, $query: String, $first: Int, $skip: Int) {
    users(query: $query, first: $first, skip: $skip, orderBy: lastName_ASC) {
      id
      firstName
      lastName
      email
      address
      sector {
        id
        zone
      }
    }
    count(query: $query, type: $type)
  }
`
