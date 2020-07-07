import gql from 'graphql-tag'

export const UPDATE_VISIT = gql`
  mutation UpdateVisit($id: ID, $data: UpdateVisitInput) {
    updateVisit(id: $id, data: $data) {
      id
    }
  }
`
