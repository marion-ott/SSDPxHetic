import gql from 'graphql-tag'

export const CHECK_AUTH = gql`
  query {
    checkAuth {
      success
      user {
        id
        firstName
        lastName
        email
        phone
        role
        address
        teams {
          id
          startDate
          endDate
          users {
            id
            firstName
            lastName
          }
        }
        sector {
          id
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
    }
  }
`
