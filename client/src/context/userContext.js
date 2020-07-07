import React from 'react'

const userContext = React.createContext()
const UserProvider = userContext.Provider

export { userContext as default, UserProvider }
