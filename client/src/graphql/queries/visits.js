import gql from 'graphql-tag'

export const GET_VISITS = gql`
  query Visits($sector: ID!, $date: String) {
    visits(sector: $sector, date: $date) {
      id
      hotel {
        name
        address
        zipCode
        city
        rooms
      }
    }
  }
`
