import React from 'react'
import { GET_HOTELS } from './../graphql/queries/hotels'
import { UPDATE_HOTEL, CREATE_HOTEL } from './../graphql/mutations/hotels'
import useModal from './../hooks/useModal'
import { Filters, List, Modal } from './../organisms'
import { Button, Icon } from './../atoms'

const fields = {
  uuid: '',
  name: '',
  address: '',
  zipCode: '',
  city: '',
  sector: '75',
  rooms: '',
  score: 60
}

const Hotels = () => {
  const [isActive, toggle] = useModal(false)

  return (
    <section className='section columns'>
      <div className='column is-one-fifth'>
        <Filters />
      </div>
      <div className='column'>
        <Button onClick={toggle} classProp='is-link list-add'>
          <Icon classProp='fa-concierge-bell' />
          <p>Ajouter un hôtel</p>
        </Button>
        {isActive && (
          <Modal
            isActive={isActive}
            onClick={toggle}
            data={fields}
            mutation={CREATE_HOTEL}
            title='Ajouter un hôtel'
          />
        )}
        <List
          getMany={GET_HOTELS}
          mutation={UPDATE_HOTEL}
          type='hotels'
          title='Liste des hôtels'
        />
      </div>
    </section>
  )
}

export default Hotels
