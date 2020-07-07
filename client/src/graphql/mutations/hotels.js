import gql from 'graphql-tag'

export const CREATE_HOTEL = gql`
  mutation CreateHotel($data: CreateHotelInput) {
    createHotel(data: $data) {
      name
      address
      zipCode
      city
      address
    }
  }
`

export const UPDATE_HOTEL = gql`
  mutation UpdateHotel($id: ID, $data: UpdateHotelInput) {
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
