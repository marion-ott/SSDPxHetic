import React from 'react'
// import { useQuery } from '@apollo/react-hooks'
import { GET_HOTELS } from './../graphql/queries/hotels'
import { UPDATE_HOTEL } from './../graphql/mutations/hotels'
// import Loading from './Loading'
import { Filters } from './../organisms'
import { List } from './../organisms'

const Hotels = () => (
  <section className='section columns'>
    <Filters />
    <List
      getMany={GET_HOTELS}
      update={UPDATE_HOTEL}
      type='hotels'
      title='Liste des hôtels'
      buttonProps={{
        text: 'Ajouter un hôtel',
        icon: 'fa-concierge-bell'
      }}
    />
  </section>
)

export default Hotels
