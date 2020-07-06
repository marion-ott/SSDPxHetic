import React from 'react'
import moment from 'moment'

const dateContext = React.createContext()
const DateProvider = dateContext.Provider

export { dateContext as default, DateProvider }
