import React, { useState } from 'react'
import { LOGIN } from './../graphql/mutations/auth'
import { Modal } from './../organisms'
import Dropdown from './Dropdown'
import Icon from '../atoms/Icon'
import { Link } from 'react-router-dom'

const ListItem = ({ id, index, data, keys, query }) => {
  const [modalIsActive, setModalIsActive] = useState(false)

  var type

  if (data.__typename === 'Hotel') {
    type = 'hotels'
  }
  if (data.__typename === 'User') {
    type = 'users'
  }

  const handleClick = () => {
    setModalIsActive((val) => true)
  }

  const closeModal = () => setModalIsActive(false)

  return (
    <>
      <tr onClick={handleClick}>
        <th>{index}</th>
        {keys.map((el, i) => {
          if (typeof data[el.name] == 'object') {
            return <td key={i}>{data[el.name] ? data[el.name].zone : 'N/A'}</td>
          }
          if (el.name === 'lastVisit') {
            return (
              <td key={i}>{new Date(data[el.name]).toLocaleDateString()}</td>
            )
          }
          return <td key={i}>{data[el.name]}</td>
        })}
        <td>
          <Dropdown title={<Icon classname='fa-ellipsis-h' />}>
            <Link to={`/${type}/${data.id}`} className='dropdown-item'>
              Détails
            </Link>
            <Link to='/' className='dropdown-item'>
              Modifier
            </Link>
            <Link to='/' className='dropdown-item'>
              Supprimer
            </Link>
          </Dropdown>
        </td>
      </tr>
      {modalIsActive && (
        <Modal
          isActive={modalIsActive}
          close={closeModal}
          data={data}
          query={query}
          title='Modifier'
        />
      )}
    </>
  )
}

export default ListItem
