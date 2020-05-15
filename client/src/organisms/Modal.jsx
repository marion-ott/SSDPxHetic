import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { getFormProps } from './../global/data'
import { Form } from './index'
import { Title } from './../atoms'

const Modal = ({ isActive, title, data, onClick, update }) => {
  const [callback, { loading, error }] = useMutation(update, {
    onCompleted() {
      onClick()
    },
    onError: (error) => console.error(error)
  })
  const [form, schema] = getFormProps(data)

  if (error) {
    return <p>there was an error</p>
  }

  if (loading) {
    return <p>loading</p>
  }

  return (
    <div className={`modal${isActive ? ' is-active' : ''}`}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <div className='modal-card-head'>
          <Title classProp='is-3 modal-card-title' tag='h3'>
            {title}
          </Title>
          <button
            onClick={onClick}
            className='delete'
            aria-label='close'></button>
        </div>
        <section className='modal-card-body'>
          <Form
            id={data.id}
            data={form}
            schema={schema}
            withIcon={false}
            callback={callback}
          />
        </section>
      </div>
    </div>
  )
}

export default Modal
