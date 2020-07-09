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

  return (
    <div class="dropdown is-right is-hoverable">
      <div class="dropdown-trigger">
        <button style={{ border: "none", outline: 0 }} class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
          <span class="icon is-small">
            <i class="far fa-bell"></i>
          </span>
        </button>
      </div>
      <div style={{ minWidth: "19rem", borderRadius: 8 }} class="dropdown-menu" id="dropdown-menu4" role="menu">
        <div class="dropdown-content">
          {[null, null, null].map(() => {
            return (
              <div style={{ backgroundColor: "#FCFCFC", margin: 5, borderRadius: 8 }} class="dropdown-item">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ color: '#241F1F', opacity: 0.5, fontWeight: 500 }}>Demandeur</div>
                    <div style={{ color: "#241F1F", opacity: 0.5, fontSize: 12 }}>il y a 50min</div>
                  </div>
                  <div style={{ color: "#241F1F", fontSize: 16, fontWeight: 500 }}>Victoria Alexander</div>
                </div>
                <div style={{ marginTop: 7 }}>
                  <div style={{ color: '#241F1F', opacity: 0.5, fontWeight: 500 }}>Type</div>
                  <div style={{ color: "#241F1F", fontSize: 16, fontWeight: 500 }}>Congés</div>
                </div>
                <div style={{ marginTop: 7 }}>
                  <div style={{ color: '#241F1F', opacity: 0.5, fontWeight: 500 }}>Description</div>
                  <div style={{ color: '#241F1F', fontSize: 12 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis est laoreet nisl, pellentesque cursus amet, a.</div>
                </div>
                <div style={{ marginTop: 7, display: 'flex' }}>
                  <button class="button is-small is-success">
                    <span class="icon is-small">
                      <i class="fas fa-check"></i>
                    </span>
                    <span>Accepter</span>
                  </button>
                  <button class="button is-small">
                    <span class="icon is-small">
                      <i class="fas fa-times"></i>
                    </span>
                    <span>Rejeter</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Notifications
