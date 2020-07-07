import gql from 'graphql-tag'

export const GET_VISITS = gql`
  query Visits($teamId: ID!, $date: String) {
    myVisits(teamId: $teamId, date: $date) {
      id
      status
      priority
      hotel {
        id
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
