import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_COUNT } from './../graphql/queries/count'
import { ListItem } from '../molecules'
import { Pagination } from './../molecules'
import { Input } from '../atoms'
import { listKeys } from '../global/data'

const List = ({ entries, type, title }) => {
  const { loading, error, data } = useQuery(GET_COUNT, { variables: { type } })
  const keys = listKeys.filter((el) =>
    Object.keys(entries[0]).find((entry) => entry === el.name)
  )

  if (loading) {
    return <p>loading</p>
  }

  return (
    <div className='column'>
      <h3 className='title is-3'>
        {title}
        {data && <span className='subtitle is-6'>&nbsp;({data.count})</span>}
      </h3>
      <div className='control has-icons-left is-loading'>
        <Input type='text' placeholder='Rechercher' />
        <span className='icon is-left'>
          <i className='fas fa-search' aria-hidden='true'></i>
        </span>
      </div>
      <div className='box table-box'>
        <table className='table is-fullwidth is-hoverable'>
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
      <Pagination />
    </div>
  )
}

export default List
