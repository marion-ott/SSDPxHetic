import React from 'react'
import { GET_USERS } from './../graphql/queries/users'
import { UPDATE_USER, CREATE_USER } from './../graphql/mutations/users'
import useModal from './../hooks/useModal'
import { Filters, List, Modal } from './../organisms'
import { Button, Icon } from './../atoms'

const fields = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  sector: '',
  role: ''
}

const Employees = () => {
  const [isActive, toggle] = useModal(false)

  return (
    <section className='section columns'>
      <div className='column is-one-fifth'>
        <Filters />
      </div>
      <div className='column'>
        <Button onClick={toggle} classProp='is-link list-add'>
          <Icon classProp='fa-user-plus' />
          <p>Ajouter un intervenant</p>
        </Button>
        {isActive && (
          <Modal
            isActive={isActive}
            onClick={toggle}
            data={fields}
            mutation={CREATE_USER}
            title='Ajouter un intervenant'
          />
        )}
        <List
          getMany={GET_USERS}
          mutation={UPDATE_USER}
          type='users'
          title='Liste des intervenants'
        />
      </div>
    </section>
  )
}

export default Employees
