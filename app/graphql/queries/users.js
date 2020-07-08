import gql from 'graphql-tag'

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
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
      address
      email
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
    }
  }
`

export const GET_USERS = gql`
  query {
    users {
      id
      firstName
      lastName
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
      address
      email
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
    }
  }
`
