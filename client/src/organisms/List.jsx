import React, { useMemo } from 'react'
import { ListItem } from '../molecules'
import { Input } from '../atoms'
import { listKeys } from '../global/data'

const List = ({ entries }) => {
  const keys = listKeys.filter((el) =>
    Object.keys(entries[0]).find((entry) => entry === el.name)
  )
  return (
    <div className='column'>
      <div className='control has-icons-left is-loading'>
        <Input type='text' placeholder='Rechercher' />
        <span className='icon is-left'>
          <i className='fas fa-search' aria-hidden='true'></i>
        </span>
      </div>
      <table className='table table is-fullwidth is-hoverable'>
        <thead>
          <tr>
            <th></th>
            {keys.map((el, id) => (
              <th key={id}>{el.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <ListItem
              key={entry.id}
              index={index + 1}
              data={entry}
              keys={keys}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List
