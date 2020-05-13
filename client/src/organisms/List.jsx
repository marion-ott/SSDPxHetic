import React, { useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ListItem, Pagination } from '../molecules'
import { Input, Title, Button, Icon } from '../atoms'
import { listKeys } from '../global/data'

const List = ({ title, get, update, type, buttonProps }) => {
  // const { loading, error, data } = useQuery(GET_COUNT, {
  //   variables: { type, query: queryArg }
  // })

  const { loading, error, data, fetchMore } = useQuery(get, {
    variables: {
      query: '',
      type,
      first: 15,
      skip: 0
    }
  })
  const searchInput = useRef('')

  const handleSearch = (event) => {
    event.preventDefault()
    searchInput.current = event.target[0].value
    fetchMore({
      variables: {
        query: searchInput.current,
        first: 15,
        skip: 0
      },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev
        return {
          [type]: [...fetchMoreResult[type]],
          count: fetchMoreResult.count
        }
      }
    })
  }

  if (loading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>error</p>
  }

  const keys = listKeys.filter((el) =>
    Object.keys(data[type][0]).find((entry) => entry === el.name && el.inTable)
  )

  return (
    <div className='column'>
      <div className='list-head'>
        <Title classProp='is-3' tag='h3'>
          {title}
          <span className='subtitle is-6'>&nbsp;({data.count})</span>
        </Title>
        <Button classProp='is-link'>
          <Icon classProp={buttonProps.icon} />
          <p>{buttonProps.text}</p>
        </Button>
      </div>
      <form onSubmit={handleSearch} className='search-container'>
        <div className='control has-icons-right'>
          <Input
            name='query'
            type='text'
            placeholder='Rechercher'
            defaultValue=''
          />
          <span className='icon is-right'>
            <i className='fas fa-search' aria-hidden='true'></i>
          </span>
        </div>
      </form>
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
            {data[type].map((entry, index) => (
              <ListItem
                key={entry.id}
                id={entry.id}
                index={index + 1}
                data={entry}
                keys={keys}
                query={update}
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
