import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_COUNT } from './../graphql/queries/count'
import { Modal } from '../organisms'
import { ListItem, Pagination } from '../molecules'
import { Input, Title } from '../atoms'
import { listKeys } from '../global/data'

const List = ({ entries, type, title, query }) => {
  const { loading, error, data } = useQuery(GET_COUNT, { variables: { type } })
  const keys = listKeys.filter((el) =>
    Object.keys(entries[0]).find((entry) => entry === el.name && el.inTable)
  )

  if (loading) {
    return <p>loading</p>
  }

  return (
    <div className='column'>
      <Title classProp='is-3' tag='h3'>
        {title}
        <span className='subtitle is-6'>&nbsp;({data.count})</span>
      </Title>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <ListItem
                key={entry.id}
                id={entry.id}
                index={index + 1}
                data={entry}
                keys={keys}
                query={query}
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
