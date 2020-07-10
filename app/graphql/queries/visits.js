import gql from 'graphql-tag'

export const GET_VISITS = gql`
  query Visits($teamId: ID!, $date: String) {
    myVisits(teamId: $teamId, date: $date) {
      id
      status
      priority
      hotel {
        name
        address
        zipCode
        city
        phone
        rooms
        lat
        long
      }
    }
  }
`
