import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS } from './../graphql/queries/users'
import { UPDATE_USER } from './../graphql/mutations/users'
import Loading from './Loading'
import { Filters } from './../organisms'
import { List } from './../organisms'

const Employees = () => {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      first: 15,
      skip: 0
    }
  })

  if (error) {
    return <p>there was an error</p>
  }

  if (loading) {
    return <Loading />
  }

  return (
    <section className='section columns'>
      <Filters />
      <List
        entries={data.users}
        type='users'
        title='Liste des employés'
        query={UPDATE_USER}
      />
    </section>
  )
}

export default Employees
