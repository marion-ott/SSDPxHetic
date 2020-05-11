import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_HOTELS } from './../graphql/queries/hotels'
import Loading from './Loading'
import { Filters } from './../organisms'
import { List } from './../organisms'

const Hotels = () => {
  const { loading, error, data } = useQuery(GET_HOTELS, {
    variables: {
      first: 15,
      skip: 0,
      orderBy: 'lastVisit_DESC'
    }
  })

  if (error) {
    console.log(error)
    return <p>there was an error</p>
  }

  if (loading) {
    return <Loading />
  }

  return (
    <section className='section columns'>
      <Filters />
      <List entries={data.hotels} type='hotels' title='Liste des hôtels' />
    </section>
  )
}

export default Hotels
