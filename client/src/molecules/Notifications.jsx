import React, { useState, useEffect } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { SUBSCRIBE_VISITS } from '../graphql/subscriptions/visits'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const { data, loading } = useSubscription(SUBSCRIBE_VISITS)

  useEffect(() => {
    console.log(data)
    if (data) {
      const state = notifications
      state.push(data)
      setNotifications([...state])
    }
  }, [data])

  return (
    <div className='dropdown is-right is-hoverable'>
      <div className='dropdown-trigger'>
        {notifications && notifications.length}
        <button
          style={{ border: 'none', outline: 0 }}
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu4'>
          <span className='icon is-small'>
            <i className='far fa-bell'></i>
          </span>
        </button>
      </div>
      <div
        style={{ minWidth: '19rem', borderRadius: 8 }}
        className='dropdown-menu'
        id='dropdown-menu4'
        role='menu'>
        <div className='dropdown-content'>
          {[1, 2, 3].map((index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#FCFCFC',
                  margin: 5,
                  borderRadius: 8
                }}
                className='dropdown-item'>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                    <div
                      style={{
                        color: '#241F1F',
                        opacity: 0.5,
                        fontWeight: 500
                      }}>
                      Demandeur
                    </div>
                    <div
                      style={{ color: '#241F1F', opacity: 0.5, fontSize: 12 }}>
                      il y a 50min
                    </div>
                  </div>
                  <div
                    style={{ color: '#241F1F', fontSize: 16, fontWeight: 500 }}>
                    Victoria Alexander
                  </div>
                </div>
                <div style={{ marginTop: 7 }}>
                  <div
                    style={{ color: '#241F1F', opacity: 0.5, fontWeight: 500 }}>
                    Type
                  </div>
                  <div
                    style={{ color: '#241F1F', fontSize: 16, fontWeight: 500 }}>
                    Congés
                  </div>
                </div>
                <div style={{ marginTop: 7 }}>
                  <div
                    style={{ color: '#241F1F', opacity: 0.5, fontWeight: 500 }}>
                    Description
                  </div>
                  <div style={{ color: '#241F1F', fontSize: 12 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mattis est laoreet nisl, pellentesque cursus amet, a.
                  </div>
                </div>
                <div style={{ marginTop: 7, display: 'flex' }}>
                  <button className='button is-small is-success'>
                    <span className='icon is-small'>
                      <i className='fas fa-check'></i>
                    </span>
                    <span>Accepter</span>
                  </button>
                  <button className='button is-small'>
                    <span className='icon is-small'>
                      <i className='fas fa-times'></i>
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
