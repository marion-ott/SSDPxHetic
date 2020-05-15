import React from 'react';

export const userContext = React.createContext();

export const UserProvider = userContext.Provider
export const UserConsumer = userContext.Consumer

export default userContext
