import React, { useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_HOTELS } from './../graphql/queries/hotels'
import { UPDATE_HOTEL } from './../graphql/mutations/hotels'
import Loading from './Loading'
import { Filters } from './../organisms'
import { List } from './../organisms'

const Hotels = () => {
  // if (error) {
  //   return <p>there was an error</p>
  // }

  // if (loading) {
  //   return <Loading />
  // }

  return (
    <section className='section columns'>
      <Filters />
      <List
        // entries={data.hotels}
        // handleSearch={handleSearch}
        get={GET_HOTELS}
        update={UPDATE_HOTEL}
        // count={data.count}
        // queryArg={searchInput.current}
        type='hotels'
        title='Liste des hôtels'
        buttonProps={{
          text: 'Ajouter un hôtel',
          icon: 'fa-concierge-bell'
        }}
      />
    </section>
  )
}

export default Hotels
