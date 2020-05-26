import { useState } from 'react'

const useModal = (initial) => {
  const [isActive, setIsActive] = useState(initial)
  return [isActive, () => setIsActive((status) => !status)]
}

export default useModal
