import gql from 'graphql-tag'

export const CREATE_HOTEL = gql`
  mutation CreateHotel($body: CreateHotelInput) {
    createHotel(data: $body) {
      firstName
      lastName
      role
      sector
      address
      email
    }
  }
`

export const UPDATE_HOTEL = gql`
  mutation UpdateUser($id: ID, $data: UpdateHotelInput) {
    updateHotel(id: $id, data: $data) {
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
  }
`
