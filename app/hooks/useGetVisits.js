import { useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { GET_VISITS } from './../graphql/queries/visits'

const useGetVisits = (teamId, date, deps = []) => {
  const [getData, { loading, data, error }] = useLazyQuery(GET_VISITS)
  useEffect(() => {
    getData({
      variables: {
        teamId,
        date
      }
    })
  }, deps)

  return { loading, error, data }
}

export default useGetVisits
