import React from 'react'
import * as yup from 'yup'
import { getFormProps } from './../global/data'
import { Form } from './index'
import { Title, Button } from './../atoms'

const mock = {
  firstName: 'Marion',
  lastName: 'Ott',
  email: 'marion_ott@me.com',
  address: 'adresse postale',
  zipCode: 75004,
  city: 'Paris',
  sector: '75'
}

const Modal = ({ isActive, title = 'éditer', data }) => {
  const [form, schema] = getFormProps(mock)

  return (
    <div className={`modal${isActive ? ' is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <div className='modal-card-head'>
          <Title classProp='is-3 modal-card-title' tag='h3'>
            {title}
          </Title>
          <button className='delete' aria-label='close'></button>
        </div>
        <section className='modal-card-body'>
          <Form data={form} schema={schema} />
        </section>
      </div>
    </div>
  )
}

export default Modal
