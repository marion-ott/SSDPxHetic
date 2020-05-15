import React from 'react'
import { GET_HOTEL } from './../graphql/queries/hotels'
import { GET_USER } from './../graphql/queries/users'
import { useQuery } from '@apollo/react-hooks'

const useGetOne = (type, id) => {
  let query
  if (type === 'hotel') {
    query = GET_HOTEL
  } else {
    query = GET_USER
  }

  const { loading, error, data } = useQuery(query, {
    variables: { id }
  })

  return {
    loading,
    error,
    data
  }
}

export default useGetOne
