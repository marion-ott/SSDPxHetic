import gql from 'graphql-tag'

export const GET_VISITS = gql`
  query Visits($teamId: ID!, $date: String) {
    myVisits(teamId: $teamId, date: $date) {
      id
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
