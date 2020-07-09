import gql from 'graphql-tag'

export const GET_VISITS = gql`
  query Visits($start: String, $end: String) {
    visits(start: $start, end: $end) {
      id
      status
      priority
      date
      team {
        users {
          firstName
          lastName
        }
      }
      hotel {
        name
        address
        zipCode
        city
        rooms
        lat
        long
      }
    }
  }
`
