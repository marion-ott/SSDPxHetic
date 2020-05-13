import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Login($data: LoginInput) {
    login(data: $data) {
      user {
        id
        firstName
        lastName
        email
        role
      }
      token
    }
  }
`
