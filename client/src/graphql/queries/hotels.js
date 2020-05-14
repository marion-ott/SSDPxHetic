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
  query Hotels($type: String!, $query: String, $first: Int, $skip: Int) {
    hotels(query: $query, first: $first, skip: $skip, orderBy: lastVisit_DESC) {
      id
      name
      rooms
      lastVisit
      address
      zipCode
      city
      score
      sector {
        zone
      }
    }
    count(type: $type, query: $query)
  }
`
