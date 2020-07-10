import gql from 'graphql-tag'

export const UPDATE_VISIT = gql`
  mutation UpdateVisit($id: ID!, $data: UpdateVisitInput) {
    updateVisit(id: $id, data: $data) {
      id
      status
    }
  }
`

export const DELETE_VISIT = gql`
  mutation DeleteVisit($id: ID!) {
    deleteVisit(id: $id) {
      id
    }
  }
`
