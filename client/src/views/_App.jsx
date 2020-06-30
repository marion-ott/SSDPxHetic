import React, { useState, useEffect } from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { UserProvider } from '../context/userContext'
import { SectorProvider } from '../context/sectorContext'
import useCheckAuth from '../hooks/useCheckAuth'
import { useQuery } from '@apollo/react-hooks'
import { GET_SECTORS } from './../graphql/queries/sectors'
import Login from './Login'
import Home from './Home'
import Employees from './Employees'
import Hotels from './Hotels'
import Details from './Details'
import { Nav } from '../organisms'

function App() {
  const [auth, setAuth] = useState({ user: null, loggedIn: false })
  const { loading, error, data } = useCheckAuth()
  const { loading: sectorsLoad, error: sectorsErr, data: sectors } = useQuery(
    GET_SECTORS
  )

  useEffect(() => {
    if (data) {
      setAuth({
        user: data.checkAuth,
        loggedIn: true
      })
    }
  }, [error, data])

  const handleLogin = (userData) => {
    setAuth({
      user: userData,
      loggedIn: true
    })
  }

  if (loading || sectorsLoad) {
    return <p>loading</p>
  }

  if (
    (error && !error.message.includes('Authentication required')) ||
    sectorsErr
  ) {
    return <p>error</p>
  }

  return (
    <UserProvider value={auth}>
      <SectorProvider value={sectors}>
        <Router>
          {auth.loggedIn && <Nav setAuth={setAuth} />}
          <Switch>
            <Route
              exact
              path='/login'
              render={() =>
                !auth.loggedIn ? (
                  <Login handleLogin={handleLogin} />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
            <Route
              exact
              path='/'
              render={() =>
                auth.loggedIn ? <Home /> : <Redirect to='/login' />
              }
            />
            <Route
              exact
              path='/users'
              render={() =>
                auth.loggedIn ? <Employees /> : <Redirect to='/login' />
              }
            />
            <Route
              path='/users/:userId'
              render={() =>
                auth.loggedIn ? <Details /> : <Redirect to='/login' />
              }
            />
            <Route
              exact
              path='/hotels'
              render={() =>
                auth.loggedIn ? <Hotels /> : <Redirect to='/login' />
              }
            />
            <Route
              path='/hotels/:hotelId'
              render={() =>
                auth.loggedIn ? <Details /> : <Redirect to='/login' />
              }
            />
            <Route
              path='*'
              render={() =>
                auth.loggedIn ? <Home /> : <Redirect to='/login' />
              }
            />
          </Switch>
        </Router>
      </SectorProvider>
    </UserProvider>
  )
}

export default App
