import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { GET_VISITS } from './../graphql/queries/visits'

const useGetVisits = (teamId, week, deps = []) => {
  const [getData, { loading, data, error }] = useLazyQuery(GET_VISITS, {
    fetchPolicy: 'no-cache'
  })

  useEffect(() => {
    getData({
      variables: { ...week }
    })
  }, deps)

  return { loading, error, data }
}

export default useGetVisits
