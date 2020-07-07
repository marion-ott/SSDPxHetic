import React from 'react'
import { Link } from 'react-router-dom'
import useModal from './../hooks/useModal'
import Dropdown from './Dropdown'
import { Modal } from './../organisms'
import Icon from '../atoms/Icon'

const ListItem = ({ id, index, type, data, keys, mutation, currentPage }) => {
  const [isActive, toggle] = useModal(false)

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
            <p onClick={toggle} className='dropdown-item'>
              Modifier
            </p>
            <p className='dropdown-item has-text-danger '>Supprimer</p>
          </Dropdown>
        </td>
      </tr>
      {isActive && (
        <Modal
          isActive={isActive}
          onClick={toggle}
          data={data}
          mutation={mutation}
          title='Modifier'
        />
      )}
    </>
  )
}

export default ListItem
