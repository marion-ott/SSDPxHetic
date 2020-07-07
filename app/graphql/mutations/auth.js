import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Login($data: LoginInput) {
    login(data: $data) {
      user {
        id
        firstName
        lastName
        teams {
          id
          startDate
          endDate
          users {
            id
            firstName
          }
        }
        sector {
          id
          zone
          schedules {
            startDate
            endDate
            shift {
              startTime
              endTime
            }
          }
        }
      }
      token
    }
  }
`
