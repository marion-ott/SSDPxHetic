import React, { useState, useContext, useEffect } from 'react'
import notificationContext from '../context/notificationContext'
import { getDateStr } from '../utils'
import moment from 'moment/min/moment-with-locales'

const Notifications = () => {
  const { notifications } = useContext(notificationContext)
  const [readNotifications, setReadNotifications] = useState(true)

  useEffect(() => {
    setReadNotifications(false)
  }, [notifications])

  return (
    <div
      className='dropdown is-right is-hoverable'
      onMouseLeave={() => setReadNotifications(true)}>
      <div className='dropdown-trigger'>
        <button
          style={{
            border: 'none',
            outline: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            marginRight: '15px'
          }}
          className='button'
          aria-haspopup='true'
          aria-controls='dropdown-menu4'>
          <span style={{ position: 'relative' }} className='icon is-small'>
            <i className='far fa-bell'></i>
            {notifications.length > 0 && !readNotifications && (
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '10px',
                  height: '10px',
                  background: '#D80000',
                  borderRadius: '50px'
                }}></div>
            )}
          </span>
        </button>
      </div>
      {notifications.length > 0 && (
        <div
          style={{ minWidth: '19rem', borderRadius: 8 }}
          className='dropdown-menu'
          id='dropdown-menu4'
          role='menu'>
          <div className='dropdown-content'>
            {notifications.map(({ visit }, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#F8F8F8',
                    margin: 8,
                    borderRadius: 8
                  }}
                  className='dropdown-item'>
                  <div style={{ marginTop: 7 }}>
                    <div
                      style={{
                        color: '#241F1F',
                        opacity: 0.5,
                        fontWeight: 500
                      }}>
                      Report de visite
                    </div>
                    <div
                      style={{
                        color: '#241F1F',
                        fontSize: 16,
                        fontWeight: 500
                      }}>
                      {`La visite de l'hôtel ${visit.data.hotel.name} prévue le
                      ${moment(visit.data.date)
                        .locale('fr')
                        .format('dddd Do MMMM')} a été reportée.`}
                    </div>
                  </div>
                  <div style={{ marginTop: 7 }}>
                    <div
                      style={{
                        color: '#241F1F',
                        opacity: 0.5,
                        fontWeight: 500
                      }}>
                      Équipe
                    </div>
                    <div style={{ color: '#241F1F', fontSize: 12 }}>
                      <p>
                        {visit.data.team.users.map(
                          ({ firstName, lastName }, index) => {
                            const suffix =
                              index === visit.data.team.users.length - 1
                                ? ''
                                : '& '
                            return (
                              <span>
                                {firstName} {firstName} {suffix}
                              </span>
                            )
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
