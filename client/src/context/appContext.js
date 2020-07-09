import React from 'react'

const appContext = React.createContext()
const AppProvider = appContext.Provider

export { appContext as default, AppProvider }
