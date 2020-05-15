import React, { useState, useEffect } from 'react'
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Employees from './Employees'
import Hotels from './Hotels'
import Details from './Details'
import { Nav } from '../organisms'
import { UserProvider } from '../context/userContext'
import useCheckAuth from '../hooks/useCheckAuth'
import UserContext from '../context/userContext'


function App() {
  const {loading, error, data} = useCheckAuth()
  const [auth, setAuth] = useState({ user: null, loggedIn: false })

  useEffect(() => {
    if (error) {
      setAuth({
        user: null,
        loggedIn: false
      })
    } 
    if (data) {
      setAuth({
        user: data.user,
        loggedIn: true
      })
    }
  }, [error, data])

  const handleLogin = (userData) => {
    setAuth({
      user: userData,
      loggedIn: true,
    })
  }

  if (loading) {
    return <p>loading</p>
  }
 
  return (
    <UserProvider value={auth}>
      <Router>
        {auth.loggedIn && <Nav />}
        <Switch>
          <Route exact path='/login' render={() => (!auth.loggedIn
            ? <Login handleLogin={handleLogin} />
            : <Redirect to='/' />)
          }/>
          <Route exact path='/' render={() => (auth.loggedIn 
            ? <Home />
            : <Redirect to='/login' />)
          }/>
          <Route exact path='/users' render={() => (auth.loggedIn 
            ? <Employees />
            : <Redirect to='/login' />)
          }/>
          <Route path='/users/:userId' render={() => (auth.loggedIn 
            ? <Details />
            : <Redirect to='/login' />)
          }/>
          <Route exact path='/hotels' render={() => (auth.loggedIn 
            ? <Hotels />
            : <Redirect to='/login' />)
          }/>
          <Route path='/hotels/:hotelId' render={() => (auth.loggedIn 
            ? <Details />
            : <Redirect to='/login' />)
          }/>
          <Route path='*' render={() => (auth.loggedIn
            ? <Home />
            : <Redirect to='/login' />)
          }/>
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
