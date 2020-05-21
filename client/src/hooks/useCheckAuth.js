// import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CHECK_AUTH } from './../graphql/queries/auth'

const useCheckAuth = () => {
  const { loading, error, data } = useQuery(CHECK_AUTH)
  return { loading, error, data }
}

export default useCheckAuth
