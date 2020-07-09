import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { SUBSCRIBE_VISITS } from '../graphql/subscriptions/visits'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const { data, loading } = useSubscription(SUBSCRIBE_VISITS)

  useEffect(() => {
    if (data) {
      const state = notifications
      state.push(data)
      updateNotifications(state)
    }
  }, [data])

  const updateNotifications = (state) => {
    setNotifications(state)
  }

  return <div>notifications: {notifications.length}</div>
}

export default Notifications
