import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS } from './../graphql/queries/users'
import { UPDATE_USER } from './../graphql/mutations/users'
import Loading from './Loading'
import { Filters } from './../organisms'
import { List } from './../organisms'

const Employees = () => {
  return (
    <section className='section columns'>
      <Filters />
      <List
        get={GET_USERS}
        update={UPDATE_USER}
        type='users'
        title='Liste des intervenants'
        buttonProps={{
          text: 'Ajouter un intervenant',
          icon: 'fa-user-plus'
        }}
      />
    </section>
  )
}

export default Employees
