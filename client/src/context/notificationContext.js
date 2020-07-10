import React from 'react'

const notificationContext = React.createContext()
const NotificationProvider = notificationContext.Provider

export { notificationContext as default, NotificationProvider }
