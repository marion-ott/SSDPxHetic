import React, { useState } from 'react'
import { Modal } from './../organisms'
import Dropdown from './Dropdown'
import Icon from '../atoms/Icon'
import { Link } from 'react-router-dom'

const ListItem = ({
  id,
  index,
  type,
  getOne,
  data,
  keys,
  update,
  currentPage
}) => {
  const [modalIsActive, setModalIsActive] = useState(false)

  const handleClick = () => {
    setModalIsActive((val) => !val)
  }

  return (
    <>
      <tr>
        <th>{index + 15 * (currentPage - 1) + 1}</th>
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
          onClick={handleClick}
          data={data}
          update={update}
          title='Modifier'
        />
      )}
    </>
  )
}

export default ListItem
