import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS } from './../graphql/queries/users'
import { Filters } from './../organisms'
import { List } from './../organisms'

const Employees = () => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (error) {
    return <p>there was an error</p>
  }

  if (loading) {
    return <p>loading...</p>
  }
  console.log(data)
  return (
    <section className='section columns'>
      <Filters />
      <List entries={data.users} />
    </section>
  )
}

export default Employees
