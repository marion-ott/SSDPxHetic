import gql from 'graphql-tag'

export const GET_HOTEL = gql`
  query Hotel($id: ID!) {
    hotel(where: { id: $id }) {
      id
      uuid
      name
      address
      zipCode
      city
      active
      rooms
      lastVisit
      score
      lat
      long
      sector {
        zone
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_HOTELS = gql`
  query {
    hotels {
      id
      name
      rooms
      lastVisit
      score
      sector {
        zone
      }
    }
  }
`
