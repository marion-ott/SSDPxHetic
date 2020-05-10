import gql from 'graphql-tag'

export const GET_USER = gql`
  query User($id: ID!) {
    user(where: { id: $id }) {
      id
      firstName
      lastName
      role
      sector {
        id
        zone
      }
      address
      email
      createdAt
      updatedAt
    }
  }
`

export const GET_USERS = gql`
  query Users($first: Int, $skip: Int) {
    users(first: $first, skip: $skip) {
      id
      firstName
      lastName
      email
      role
      sector {
        id
        zone
      }
    }
  }
`
