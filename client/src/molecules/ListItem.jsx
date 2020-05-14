import React, { useState } from 'react'
import { Modal } from './../organisms'
import Dropdown from './Dropdown'
import Icon from '../atoms/Icon'
import { Link } from 'react-router-dom'

const ListItem = ({ id, index, data, keys, query, currentPage }) => {
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
  /**
   * 15 résultats par page
   * PAGE 1
   * resultat 1 -> 1
   * resultat 2 -> 2
   * 
   * PAGE 2
   * resultat 1 -> 16
   * resultat 2 -> 17
   * (index + resultatParPage * (page - 1)) + 1
   * 15 * 2
   * PAGE 3
   * resultat 1 -> 31
   * resultat 2 -> 32
   */
  const closeModal = () => setModalIsActive(false)
  // console.log(index, currentPage)
  return (
    <>
      <tr onClick={handleClick}>
        <th>{index + (15 * (currentPage - 1)) + 1}</th>
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
        <td className='list-dropdown'>
          <Dropdown title={<Icon classProp='fa-ellipsis-h' />}>
            <Link to={`/${type}/${data.id}`} className='dropdown-item'>
              Détails
            </Link>
            <p onClick={handleClick} className='dropdown-item'>
              Modifier
            </p>
            <p className='dropdown-item has-text-danger '>Supprimer</p>
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

