import { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { GET_VISITS } from './../graphql/queries/visits'

const useGetVisits = (sector, date, deps = []) => {
  const [getData, { loading, data, error }] = useLazyQuery(GET_VISITS)

  useEffect(() => {
    getData({
      variables: {
        sector,
        date
      }
    })
  }, deps)

  return { loading, error, data }
}

export default useGetVisits
