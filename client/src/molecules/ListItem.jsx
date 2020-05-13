import React, { useState } from 'react'
import { LOGIN } from './../graphql/mutations/auth'
import { Modal } from './../organisms'

const ListItem = ({ id, index, data, keys, query }) => {
  const [modalIsActive, setModalIsActive] = useState(false)

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
