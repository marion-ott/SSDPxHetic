import React, { useState } from 'react'
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Employees from './Employees'
import Hotels from './Hotels'
import Details from './Details'
import { Nav } from '../organisms'
import { UserProvider } from '../context/userContext'

function App() {

  const [user, setUser] = useState({ user: null, loggedIn: false })

  const handleLogin = (userData) => {
    setUser({
      user: userData,
      loggedIn: true,
    })
  }

  console.log(user)


  return (
    <UserProvider value={user}>
      <Router>
        <Switch>
          <Route exact path='/login'>
            <Login handleLogin={handleLogin} />
          </Route>
          {user.loggedIn && (
            <div>
              <Nav />
              <Route exact path='/' render={() => (user.loggedIn ?
                <Home />
                :
                <Redirect to='/login' />)
              }>
              </Route>
              <Route exact path='/users' render={() => (user.loggedIn ?
                <Employees />
                :
                <Redirect to='/login' />)
              }>
              </Route>
              <Route path='/users/:userId' render={() => (user.loggedIn ?
                <Details />
                :
                <Redirect to='/login' />)
              }>
              </Route>
              <Route exact path='/hotels' render={() => (user.loggedIn ?
                <Hotels />
                :
                <Redirect to='/login' />)
              }>
              </Route>
              <Route path='/hotels/:hotelId' render={() => (user.loggedIn ?
                <Details />
                :
                <Redirect to='/login' />)
              }>
              </Route>
            </div>
          )}
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
