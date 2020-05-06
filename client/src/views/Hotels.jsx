import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_HOTELS } from './../graphql/queries/hotels'
import Loading from './Loading'
import { Filters } from './../organisms'
import { List } from './../organisms'

const Hotels = () => {
  const { loading, error, data } = useQuery(GET_HOTELS)
  let mutatedData = null

  if (error) {
    return <p>there was an error</p>
  }

  if (loading) {
    return <Loading />
  }

  if (data) {
    mutatedData = data.hotels.slice(0, 10)
  }

  return (
    <section className='section columns'>
      <Filters />
      <List entries={mutatedData} />
    </section>
  )
}

export default Hotels
